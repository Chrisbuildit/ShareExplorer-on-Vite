import React from "react";
import {SymbolOverview, TechnicalAnalysis} from "react-ts-tradingview-widget";
import './Widget.css'

function Widget({companyId}) {

    return (
        <div className='widgets'>
                <SymbolOverview
                    symbols={[
                        [companyId]
                    ]}
                    lineWidth="1"
                    width="100%"
                    height="370"
                    widgetFontColor="black"
                    dateFormat="dd MMM 'yy"
                />
                <TechnicalAnalysis
                colorTheme="light"
                symbol={companyId}
                // Percentage and vw/vh does not work
                width="100%"
                height="370"
                // autosize="true"      
                // isTransparent="true"
                >
                </TechnicalAnalysis>
    </div>
    )
}

export default Widget;