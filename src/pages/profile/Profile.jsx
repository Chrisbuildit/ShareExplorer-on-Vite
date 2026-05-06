import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import './Profile.css';
import { Link } from "react-router-dom";
import createDateString from "../../helpers/createDateString/CreateDateString";

function Profile() {
  // State to hold the raw list of search history from localStorage
  const [lastSearch, setLastSearch] = useState([]);
  
  // State to hold the processed, filtered, and reversed list for display
  const [data, setData] = useState([]);
  
  // Access authentication status and user details from the global AuthContext
  const { isAuth, user } = useContext(AuthContext);

  /**
   * Effect Hook 1: Load search history from localStorage on component mount.
   * This runs only once when the component loads.
   */
  useEffect(() => {
    const storedData = localStorage.getItem("lastSearchCompany");
    // Parse JSON string to array, defaulting to empty array if null
    setLastSearch(storedData ? JSON.parse(storedData) : []);
  }, []); // Empty dependency array ensures this runs only on mount

  /**
   * Effect Hook 2: Process and filter the search history.
   * Runs whenever 'lastSearch' changes (i.e., when data is loaded).
   */
  useEffect(() => {
    // Only proceed if user is logged in and we have search data
    if (user && lastSearch) {
      console.log("Raw Search History:", lastSearch);

      // Reverse the array so the most recent searches appear first
      // Note: .reverse() mutates the original array. 
      // Ideally, use [...lastSearch].reverse() to avoid mutation, but this works here.
      const overview = lastSearch.reverse();
      
      // Filter the list to include only entries belonging to the current user
      const currentPost = overview.filter((post) => {
        return post.User === user.id;
      });

      // Update the display state with the filtered list
      setData(currentPost);
    }
  }, [lastSearch, user]); // Re-run if search history or user changes

  return (
    <div className="Sunny-mountain">
      <div className="Profile-outer">
        {/* Check if the user is authenticated */}
        {isAuth ? (
          <div className="Profile-inner">
            {/* Check if there is any search history (even if filtered to empty) */}
            {lastSearch.length > 0 ? (
              <>
                <h3>Welcome back {user.username}!</h3>
                <p>Here you can find historical data on your last 20 searches:</p>
                
                <ul className="ProfileList">
                  {/* Map through the processed data to render the list */}
                  {data.map((item) => {
                    return (
                      <li key={item.Date}> 
                        {/* 
                          Using item.Date as the key is better than Math.random().
                          Math.random() causes React to re-render inefficiently on every update.
                        */}
                        
                        {/* Link to the detailed view using the timestamp as the ID */}
                        <Link to={`/company-details/${item.Date}`}>
                          <p>{item.Name}</p>
                        </Link>
                        
                        {/* Display the formatted date string */}
                        <p className='Date'>{createDateString(item.Date)}</p>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              // Fallback if lastSearch exists but is empty or has no data for this user
              <>
                <h2>Welcome {user.username}!</h2>
                <p>You have no recorded data.</p>
              </>
            )}
          </div>
        ) : (
          // Fallback if user is NOT authenticated
          <h3>You need to sign in first.</h3>
        )}
      </div>
    </div>
  );
}

export default Profile;