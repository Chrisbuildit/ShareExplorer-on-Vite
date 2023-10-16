import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import './SearchResults.css'
import DataLayout from "../../components/dataLayout/DataLayout";
import {AuthContext} from "../../context/AuthContext";
import Widget from "../../components/widget/Widget";

function SearchResults() {

    const [companyOverview, setCompanyOverview] = useState({});
    const [error, toggleError] = useState(false)
    const [loading, toggleLoading] = useState(false);

    const {isAuth, user} = useContext(AuthContext);
    let {companyId} = useParams();

    useEffect(() => {
        async function fetchData() {
            toggleError(false);
            toggleLoading(true);
            try {
                const response = await
                    axios.get(
                        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${companyId}&apikey=${process.env.REACT_APP_API_KEY}`);
                        // `https://stock-analysis.p.rapidapi.com/api/v1/resources/profile`,{ticker: {companyId}},{
                        //     'X-RapidAPI-Key': 'f211d01513mshd106e5c18362c9ap1146e2jsnee413242906a',
                        //     'X-RapidAPI-Host': 'stock-analysis.p.rapidapi.com'
                        // }
                        // )
                if (user) {
                    response.data.Date = Date.now();
                    response.data.User = user.id;
                }
                setCompanyOverview(response.data);
                console.log(response);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        if (companyId) {
            void fetchData();
        }
    }, [])


    useEffect(() => {
        let pastSearches = JSON.parse(localStorage.getItem("lastSearchCompany")) || [];
        if (companyOverview.Symbol && isAuth)
            if (pastSearches.length < 20) {
                pastSearches = [...pastSearches, companyOverview];
                console.log('<20')
            } else {
                const newSearches = pastSearches.slice(1);
                pastSearches = [...newSearches, companyOverview];
                console.log('>20')
            }
        localStorage.setItem("lastSearchCompany", JSON.stringify(pastSearches));
    }, [companyOverview])

    return (
        <div className='carpithians'>
            <div className='SearchResults'>
                {companyOverview.Name ?
                    <>
                        <Widget className="widgets" companyId={companyId}/>
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
                    : companyOverview.Note ?
                    <section className="SearchError">
                        <p>You have exceeded the search limit of two searches per minute.</p>
                    </section>
                    : companyId && !loading &&
                    <section className="SearchError">
                        <p>Unfortunately we have no data for this company.</p>
                        <p>You can click on the below link for data from Tradingview.</p>
                        <p><a href={`https://www.tradingview.com/symbols/${companyId}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                        >
                            Link</a></p>
                    </section>
                }
            </div>
        </div>
    );
}

export default SearchResults;