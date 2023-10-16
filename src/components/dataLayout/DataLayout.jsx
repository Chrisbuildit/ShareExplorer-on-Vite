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
                    <span>
                        <section>
                            <h3><u>General:</u></h3>
                            <p><b>Name</b>: {companyOverview.Name}</p>
                            <p><b>Symbol</b>: {companyOverview.Symbol}</p>
                            <p><b>Stock exchange</b>: {companyOverview.Exchange}</p>
                            <p><b>Fiscal Yearend</b>: {companyOverview.FiscalYearEnd}</p>
                            <p><b>Industry</b>: {companyOverview.Industry}</p>
                            <p><b>Sector</b>: {companyOverview.Sector}</p>

                            <h3><u>Ratios:</u></h3>
                            <p><b>PE Ratio</b>: {companyOverview.PERatio}</p>
                            <p><b>Trailing PE</b>: {companyOverview.TrailingPE}</p>
                            <p><b>Forward PE</b>: {companyOverview.ForwardPE}</p>
                            <p><b>PEG Ratio</b>: {companyOverview.PEGRatio}</p>
                            <p><b>Price to book</b>: {companyOverview.PriceToBookRatio}</p>
                            <p><b>Price to sales</b>: {companyOverview.PriceToSalesRatioTTM}</p>
                        </section>
                        <section>
                            <h3><u>&nbsp;</u></h3>
                            <p><b>Profit Margin</b>: {companyOverview.ProfitMargin}</p>
                            <p><b>Operating Margin</b>: {companyOverview.OperatingMarginTTM}</p>
                            <p><b>EV to EBITDA</b>: {companyOverview.EVToEBITDA}</p>
                            <p><b>EV to revenue</b>: {companyOverview.EVToRevenue}</p>
                            <p><b>Return on Assets</b>: {companyOverview.ReturnOnAssetsTTM}</p>
                            <p><b>Return on Equity</b>: {companyOverview.ReturnOnEquityTTM}</p>

                            <h3><u>Dividend & EPS:</u></h3>
                            <p><b>Dividend date</b>: {companyOverview.DividendDate}</p>
                            <p><b>Ex dividend date</b>: {companyOverview.ExDividendDate}</p>
                            <p><b>Dividend yield</b>: {companyOverview.DividendYield}</p>
                            <p><b>Diluted EPS TTM</b>: {companyOverview.DilutedEPSTTM}</p>
                            <p><b>Quart. earnings growth</b>: {companyOverview.QuarterlyEarningsGrowthYOY}</p>
                            <p><b>Quart. Revenue growth</b>: {companyOverview.QuarterlyRevenueGrowthYOY}</p>
                        </section>
                    </span>
                    }
                </div>
            </div>
        </div>
    );
}

export default DataLayout;