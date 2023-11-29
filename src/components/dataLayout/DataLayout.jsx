import React from 'react';
import './DataLayout.css'
import {Link} from "react-router-dom";

function DataLayout({companyOverview, error, companyId, isAuth}) {

    return (
        <div className='outer-container'>
            <p> {companyId && !isAuth &&
                <Link to="/SignIn" className="SaveOption">
                    Sign in for your latest search result to be automatically saved
                </Link>}
            </p>
            <div className='inner-container'>
                <section>{error &&
                    <>
                        <p>There was a miscommunication with the server in fetching your fundamental data.</p>
                        <p>&nbsp;</p>
                        <p>Please try again.</p>
                    </>
                    } 
                </section>
                <div>
                    {companyOverview &&
                    <span className="Mobile">
                        <section className="Section">
                            <h3><u>General:</u></h3>
                            <span><b>Name</b>: {companyOverview.Name}</span>
                            <span><b>Symbol</b>: {companyOverview.Symbol}</span>
                            <span><b>Stock exchange</b>: {companyOverview.Exchange}</span>
                            <span><b>Fiscal Yearend</b>: {companyOverview.FiscalYearEnd}</span>
                            <span><b>Industry</b>: {companyOverview.Industry}</span>
                            <span><b>Sector</b>: {companyOverview.Sector}</span>

                            <h3><u>Ratios:</u></h3>
                            <span><b>PE Ratio</b>: {companyOverview.PERatio}</span>
                            <span><b>Trailing PE</b>: {companyOverview.TrailingPE}</span>
                            <span><b>Forward PE</b>: {companyOverview.ForwardPE}</span>
                            <span><b>PEG Ratio</b>: {companyOverview.PEGRatio}</span>
                            <span><b>Price to book</b>: {companyOverview.PriceToBookRatio}</span>
                            <span><b>Price to sales</b>: {companyOverview.PriceToSalesRatioTTM}</span>
                        </section>
                        <section className="Section">
                            <h3>&nbsp;</h3>
                            <span><b>Profit Margin</b>: {companyOverview.ProfitMargin}</span>
                            <span><b>Operating Margin</b>: {companyOverview.OperatingMarginTTM}</span>
                            <span><b>EV to EBITDA</b>: {companyOverview.EVToEBITDA}</span>
                            <span><b>EV to revenue</b>: {companyOverview.EVToRevenue}</span>
                            <span><b>Return on Assets</b>: {companyOverview.ReturnOnAssetsTTM}</span>
                            <span><b>Return on Equity</b>: {companyOverview.ReturnOnEquityTTM}</span>

                            <h3><u>Dividend & EPS:</u></h3>
                            <span><b>Dividend date</b>: {companyOverview.DividendDate}</span>
                            <span><b>Ex dividend date</b>: {companyOverview.ExDividendDate}</span>
                            <span><b>Dividend yield</b>: {companyOverview.DividendYield}</span>
                            <span><b>Diluted EPS TTM</b>: {companyOverview.DilutedEPSTTM}</span>
                            <span><b>Quart. earnings growth</b>: {companyOverview.QuarterlyEarningsGrowthYOY}</span>
                            <span><b>Quart. Revenue growth</b>: {companyOverview.QuarterlyRevenueGrowthYOY}</span>
                        </section>
                    </span>
                    }
                </div>
            </div>
        </div>
    );
}

export default DataLayout;