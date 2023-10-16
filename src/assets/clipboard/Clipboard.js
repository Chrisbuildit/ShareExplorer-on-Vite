import {useState} from "react";


function Clipboard() {

    // const [companyOverview, setCompanyOverview] = useState({});
    // const [error, toggleError] = useState(false)
    // const [check1, setCheck1] = useState([])
    // const [check2, setCheck2] = useState(false)
    // const [pastSearches, setPastSearches] = useState([])
    //
    // function addValues() {
    //     // Check1 is data in localstorage.
    //     if (Array.isArray(check1) && check1.length) {
    //         setPastSearches(check1);
    //         setPastSearches([...pastSearches, companyOverview]);
    //         console.log('RestValues')
    //     }
    //     // && - To prevent companies with no data to be added to local storage
    //     else if(Object.keys(companyOverview).length > 0 && check2 === true) {
    //         setPastSearches([...pastSearches, companyOverview]);
    //         setCheck2(false)
    //         console.log('FirstValue')
    //     }
    //     // To capture the first run where there is no data
    //     else {
    //         setCheck2(true);
    //         console.log('NoValue')
    //     }
    // }

    // function SearchResults() {

    // const [dataLayout, setCompanyOverview] = useState({});
    // const [error, toggleError] = useState(false)
    // const [pastSearches, setPastSearches] = useState([])
    // // Get the userId param from the URL.
    // let {companyId} = useParams();


    // async function fetchData() {
    //     toggleError(false);
    //     try {
    //         const response = await
    //             axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${company}&apikey=${apiKey}`);
    //         // console.log(response.data);
    //         setCompanyOverview(response.data);
    //         const timeout = setTimeout(() => {
    //             isAuth && setPastSearches([...pastSearches,{id: dataLayout.Symbol}])}, 3000);
    //         clearTimeout(timeout);
    //         console.log(pastSearches);
    //         isAuth && localStorage.setItem("lastSearchCompany",JSON.stringify(pastSearches));
    //         // isAuth && setPastSearches([...pastSearches,{id: {company}}]);
    //         // console.log(pastSearches);
    //         // isAuth && localStorage.setItem("lastSearchCompany",JSON.stringify(pastSearches));
    //     } catch (e) {
    //         console.error(e);
    //         toggleError(true);
    //     }
    // }
    //     if(company) {
    //     void fetchData();
    //     }
    // },[company]);
    //
    // useEffect(() => {
    //         // const timeout = setTimeout(() => {
    //         //     isAuth && setPastSearches([...pastSearches,{id: dataLayout.Symbol}])}, 3000);
    //         // clearTimeout(timeout);
    //         // console.log(pastSearches);
    //         // isAuth && localStorage.setItem("lastSearchCompany",JSON.stringify(pastSearches));
    // },[dataLayout])
    //
    // return (
    //     <div className='carpithians outer-container'>
    //         <p> {company && !isAuth &&
    //             <Link to="/SignIn" className="SaveOption">
    //                 Sign in for your latest search result to be automatically saved
    //             </Link>}
    //         </p>
    //         <div className='inner-container'>
    //             {/!*<div className="widgets"> {company &&*!/}
    //             {/!*    <>*!/}
    //             {/!*        <TechnicalAnalysis*!/}
    //             {/!*            colorTheme="light"*!/}
    //             {/!*            symbol={company}*!/}
    //             {/!*            width="350"*!/}
    //             {/!*            height="375"*!/}
    //             {/!*            isTransparent="true"*!/}
    //             {/!*        >*!/}
    //             {/!*        </TechnicalAnalysis>*!/}
    //             {/!*        <SymbolOverview*!/}
    //             {/!*            symbols={company}*!/}
    //             {/!*            lineWidth="1"*!/}
    //             {/!*            width="350"*!/}
    //             {/!*            height="370"*!/}
    //             {/!*            widgetFontColor="black"*!/}
    //             {/!*            dateFormat="dd MMM 'yy"*!/}
    //             {/!*        >*!/}
    //             {/!*        </SymbolOverview>*!/}
    //             {/!*    </>*!/}
    //             {/!*}*!/}
    //             {/!*</div>*!/}
    //             <div>{error &&
    //                 <>
    //                 <p>There was a miscommunication with the server in fetching your fundamental data.</p>
    //                 <p>&nbsp;</p>
    //                 <p>Please try again.</p>
    //                 </>
    //             }</div>
    //             <div> {!Object(dataLayout.Name).length > 0 ?
    //                 <div> {!Object.keys(dataLayout).length > 0 ?
    //                     <div> {company &&
    //                         <>
    //                             <p>&nbsp;</p>
    //                             <p>Unfortunately we have no data for this company.</p>
    //                             <p>&nbsp;</p>
    //                             <p>You can click on the below link for data from Tradingview.</p>
    //                             <p>&nbsp;</p>
    //                             <p><a href={`https://www.tradingview.com/symbols/${company}/`}
    //                                   target="_blank"
    //                                   rel="noopener noreferrer"
    //                             >
    //                                 Link</a></p>
    //                         </>
    //                     }
    //                     </div>
    //                  : company &&
    //                     <>
    //                         <p>&nbsp;</p>
    //                         <p>You have exceeded your number of searches.</p>
    //                         <p>&nbsp;</p>
    //                         <p>You can only make approximately 2 searches per minute.</p>
    //                         <p>&nbsp;</p>
    //                         <p>Make yourself a cup of coffee.</p>
    //                     </>
    //                     }
    //                 </div> : company &&
    //                 <>
    //                     <h2>Fundamental data:</h2>
    //                     <span>
    //                         <section>
    //                             <h3><u>General:</u></h3>
    //                             <p><b>Name</b>: {dataLayout.Name}</p>
    //                             <p><b>Symbol</b>: {dataLayout.Symbol}</p>
    //                             <p><b>Stock exchange</b>: {dataLayout.Exchange}</p>
    //                             <p><b>Fiscal Yearend</b>: {dataLayout.FiscalYearEnd}</p>
    //                             <p><b>Industry</b>: {dataLayout.Industry}</p>
    //                             <p><b>Sector</b>: {dataLayout.Sector}</p>
    //
    //                             <h3><u>Ratios:</u></h3>
    //                             <p><b>PE Ratio</b>: {dataLayout.PERatio}</p>
    //                             <p><b>Trailing PE</b>: {dataLayout.TrailingPE}</p>
    //                             <p><b>Forward PE</b>: {dataLayout.ForwardPE}</p>
    //                             <p><b>PEG Ratio</b>: {dataLayout.PEGRatio}</p>
    //                             <p><b>Price to book</b>: {dataLayout.PriceToBookRatio}</p>
    //                             <p><b>Price to sales</b>: {dataLayout.PriceToSalesRatioTTM}</p>
    //                         </section>
    //                         <section>
    //                             <h3><u>&nbsp;</u></h3>
    //                             <p><b>Profit Margin</b>: {dataLayout.ProfitMargin}</p>
    //                             <p><b>Operating Margin</b>: {dataLayout.OperatingMarginTTM}</p>
    //                             <p><b>EV to EBITDA</b>: {dataLayout.EVToEBITDA}</p>
    //                             <p><b>EV to revenue</b>: {dataLayout.EVToRevenue}</p>
    //                             <p><b>Return on Assets</b>: {dataLayout.ReturnOnAssetsTTM}</p>
    //                             <p><b>Return on Equity</b>: {dataLayout.ReturnOnEquityTTM}</p>
    //
    //                             <h3><u>Dividend & EPS:</u></h3>
    //                             <p><b>Dividend date</b>: {dataLayout.DividendDate}</p>
    //                             <p><b>Ex dividend date</b>: {dataLayout.ExDividendDate}</p>
    //                             <p><b>Dividend yield</b>: {dataLayout.DividendYield}</p>
    //                             <p><b>Diluted EPS TTM</b>: {dataLayout.DilutedEPSTTM}</p>
    //                             <p><b>Quart. earnings growth</b>: {dataLayout.QuarterlyEarningsGrowthYOY}</p>
    //                             <p><b>Quart. Revenue growth</b>: {dataLayout.QuarterlyRevenueGrowthYOY}</p>
    //                         </section>
    //                     </span>
    //                 </>
    //             }
    //             </div>
    //         </div>
    //     </div>
    // );*/
// }

// export default SearchResults;

    // const apiKey = 'Q577X5CIYDHZEQY7';
    //
    // const [dataLayout, setCompanyOverview] = useState({});
    // const [company, setCompany] = useState('')
    //
    // async function fetchData() {
    //     try {
    //         const response = await
    //             axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${company}&apikey=${apiKey}`);
    //         console.log(response.data);
    //         setCompanyOverview(response.data);
    //     } catch(e) {
    //         console.error(e);
    //     }
    //     useEffect(() => {
    //         if(company) {
    //             fetchData()
    //         }
    //     },[company]);
    //
    // return (
    //     <div>
    //
    //         <button
    //             type='button'
    //             onClick={fetchData}>
    //             Button
    //         </button>
    //
    //         <span>
    //       {Object.keys(dataLayout).length > 0 &&
    //           <>
    //               <h3>Name: {dataLayout.Name}</h3>
    //               <h3>PriceToBookRatio: {dataLayout.PriceToBookRatio}</h3>
    //               <h3>PEGRatio: {dataLayout.PEGRatio}</h3>
    //           </>
    //       }
    //   </span>
    //     </div>
    //
    // )
// }
}

export default Clipboard;



