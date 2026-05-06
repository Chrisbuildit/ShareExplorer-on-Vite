import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import './SearchResults.css';
import DataLayout from "../../components/dataLayout/DataLayout";
import { AuthContext } from "../../context/AuthContext";
import Widget from "../../components/widget/Widget";

function SearchResults() {
  // State to hold the fetched company data
  const [companyOverview, setCompanyOverview] = useState({});
  
  // State to track if an error occurred during the fetch
  const [error, toggleError] = useState(false);
  
  // State to track the loading status of the request
  const [loading, toggleLoading] = useState(false);
  
  // Access authentication status and user details from the global AuthContext
  const { isAuth, user } = useContext(AuthContext);
  
  // Extract the companyId from the URL parameters (e.g., /search/IBM)
  let { companyId } = useParams();

  /**
   * Effect Hook: Fetches company data when the component mounts or companyId changes.
   * Uses an async function to handle the API call to Alpha Vantage.
   */
  useEffect(() => {
    async function fetchData() {
      // Reset error and set loading to true before starting
      toggleError(false);
      toggleLoading(true);

      try {
        // Call Alpha Vantage API to get company overview
        // NOTE: Ensure REACT_APP_API_KEY is defined in your .env file
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${companyId}&apikey=${process.env.REACT_APP_API_KEY}`
        );

        // If the user is authenticated, append current timestamp and user ID to the data
        // This could be used for tracking or saving search history to a backend later
        if (user) {
          response.data.Date = Date.now();
          response.data.User = user.id;
        }

        // Update state with the fetched data
        setCompanyOverview(response.data);
        console.log("Fetched Data:", response);

      } catch (e) {
        // Log error to console and set error flag to true
        console.error("Fetch Error:", e);
        toggleError(true);
      }

      // Stop loading regardless of success or failure
      toggleLoading(false);
    }

    // Only fetch if companyId exists in the URL
    if (companyId) {
      void fetchData();
    }
  }, [companyId]); // Dependency array: re-run if companyId changes

  /**
   * Effect Hook: Manages local storage for "Last Searched Companies".
   * Runs whenever companyOverview data changes.
   * Stores up to 20 most recent searches if the user is authenticated.
   */
  useEffect(() => {
    // Retrieve existing search history from localStorage or start with empty array
    let pastSearches = JSON.parse(localStorage.getItem("lastSearchCompany")) || [];

    // Only proceed if we have valid symbol data and the user is authenticated
    if (companyOverview.Symbol && isAuth) {
      
      // Check if we have room for more searches (limit of 20)
      if (pastSearches.length < 20) {
        // Add new search to the end
        pastSearches = [...pastSearches, companyOverview];
        console.log('<20 searches, added new one.');
      } else {
        // Remove the oldest search (index 0) and add new one to the end
        const newSearches = pastSearches.slice(1);
        pastSearches = [...newSearches, companyOverview];
        console.log('>20 searches, removed oldest and added new one.');
      }

      // Save the updated array back to localStorage
      localStorage.setItem("lastSearchCompany", JSON.stringify(pastSearches));
    }
  }, [companyOverview, isAuth]); // Re-run if data changes or auth status changes

  return (
    <div className='carpithians'>
      <div className='SearchResults SearchResultsMobile'>
        {/* Conditional Rendering based on the fetched data state, using a ternary operator "?" */}
        
        {companyOverview.Name ? (
          // Case 1: Data successfully fetched (Name exists)
          <>
            <Widget className="widgets" companyId={companyId} />
            <div>
              <h2>Fundamental data:</h2>
              <DataLayout 
                companyOverview={companyOverview} 
                isAuth={isAuth} 
                error={error} 
                companyId={companyId} 
              />
            </div>
          </>
        ) : companyOverview.Note ? (
          // Case 2: API returned a Note (usually means rate limit exceeded)
          <section className="SearchError">
            <p>You have exceeded the search limit of two searches per minute.</p>
          </section>
        ) : companyId && !loading ? (
          // Case 3: No data, no error, and not loading (Company not found)
          <section className="SearchError">
            <p>Unfortunately we have no data for this company.</p>
            <p>You can click on the below link for data from Tradingview.</p>
            <p>
              <a 
                href={`https://www.tradingview.com/symbols/${companyId}/`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Link
              </a>
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default SearchResults;