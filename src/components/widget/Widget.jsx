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
                    width="300"
                    height="370"
                    widgetFontColor="black"
                    dateFormat="dd MMM 'yy"
                />
                <TechnicalAnalysis
                colorTheme="light"
                symbol={companyId}
                width="350"
                height="375"
                // isTransparent="true"
                >
                </TechnicalAnalysis>
    </div>
    )
}

export default Widget;