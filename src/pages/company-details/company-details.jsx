import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './company-details.css';
import DataLayout from "../../components/dataLayout/DataLayout";
import { AuthContext } from "../../context/AuthContext";
import createDateString from "../../helpers/createDateString/CreateDateString";

// This page is meant to show the details of a previously searched companies
function CompanyDetails() {
  // Extract the 'date' parameter from the URL (expected to be a timestamp)
  let { date } = useParams();

  // State to hold the list of previously searched companies
  const [lastSearch, setLastSearch] = useState([]);

  // Access the current user object from the AuthContext
  const { user } = useContext(AuthContext);

  /**
   * Effect Hook: Loads search history from localStorage when the component mounts
   * or when the 'date' URL parameter changes.
   */
  useEffect(() => {
    // Retrieve the "lastSearchCompany" array from localStorage
    const storedData = localStorage.getItem("lastSearchCompany");
    
    // Parse the JSON string back into an array, defaulting to empty array if null
    const parsedData = storedData ? JSON.parse(storedData) : [];
    
    // Update state with the parsed data
    setLastSearch(parsedData);
    
    console.log("Loaded Search History:", parsedData);
  }, [date]); // Re-run if the 'date' param in the URL changes

  /**
   * Filter the search history to only include entries belonging to the current user.
   * This ensures users only see their own saved data.
   */
  const userFilter = lastSearch.filter((post) => {
    return post.User === user.id;
  });
  console.log("Filtered for Current User:", userFilter);

  /**
   * Find the specific company data that matches the timestamp in the URL.
   * The 'date' param is compared against the 'Date' field stored in the search history.
   */
  const currentPost = userFilter.find((post) => {
    // Convert URL date string to integer for comparison
    return post.Date === parseInt(date);
  });
  
  console.log("Matching Post Found:", currentPost);
  console.log("URL Date Param:", date);

  return (
    <div className='Switzerland'>
      <div className='company-details'>
        {/* 
          Display a formatted date string if a matching post was found.
          Uses the helper function 'createDateString' to format the timestamp.
        */}
        <p className='heading'>
          The results are from {currentPost && createDateString(currentPost.Date)}
        </p>

        {/* 
          Render the DataLayout component with the specific post data.
          Note: 'isAuth' is hardcoded to true and 'companyId' to true here, 
          assuming this page is only for authenticated historical views.
        */}
        <DataLayout
          companyOverview={currentPost}
          isAuth={true}
          error={false}
          companyId={true}
        />
      </div>
    </div>
  );
}

export default CompanyDetails;