import React, {useState} from 'react';
import './SearchBar.css';
import {useNavigate} from "react-router-dom";
import Select from 'react-select'
import OtcStocks from './data/data.json';
import {useQuery} from '@tanstack/react-query'
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import useScreenSize from '../../helpers/ScreenWidthListener';

const fetchData = async (query) => {
        console.log("FETCHING RESULTS");
        const result = await axios.get(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.REACT_APP_API_KEY}`
            // `https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${query}`,
            // 'accept: application/json','X-API-KEY: HyE5hYtoWh5QwPbmpzUVf6sposSaYEqV8BzQd8WD'
        )
        console.log(result);
        const hintArray = []
        result.data.bestMatches.map((a) => {
            return hintArray.push({
                symbol: a["1. symbol"],
                name: a["2. name"],
                type: a["3. type"],
                region: a["4. region"]
            })
        });
        const list = hintArray.filter((post) => {
            return post.type === "Equity" && post.region === "United States";
        })
        // Excludes OTC-shares from list
        const filteredArray = list.filter((element) =>
            !OtcStocks.some((otc) => otc.symbol === element.symbol))
            
        return filteredArray.map((share) => {
            return {label: share.symbol, value: share.name};
        });
};

function SearchBar() {
    const [query, setQuery] = useState('');
    const [selection, setSelection] = useState('')
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/searchResults/${selection.valueOf().label}`)
    }

    const handleOnSearch = (string, InputActionMeta) => {
        // if(InputActionMeta.action !== 'input-blur' && InputActionMeta.action !== 'menu-close') {
            setQuery(string)
        // }
    }

    const handleOnSelect = (value) => {
        setSelection(value)
    }

    const handleOnChange = () => {
        navigate(`/searchPage`)
    }

    // function abort() {
    //     setQuery("")
    // }

    const { isLoading, error, data } = useQuery(
        query ? ['StockData', query] : ['StockData'],
        async () => await fetchData(query),
        {
            // the duration until a query transitions from fresh to stale.
            staleTime: 10000,
            enabled: !!(query.length > 2 && query.length < 10)
        }
    )

    return (
        <>
    <form className="searchbar" /*onMouseLeave={abort}*/>
        <section>
            <Select
                options={data}
                // used to set the initial value of the search input
                inputValue={query}
                placeholder="Enter the name or symbol of the company"
                // invoked when there is a change in the search value
                onInputChange={handleOnSearch}
                isSearchable={true}
                isClearable={true}
                isLoading={!!query && isLoading}
                // used to specify a function that filters the option to be displayed from the options prop.
                // filterOption={null}
                noOptionsMessage={() => null}
                // invoked whenever an option is selected.
                onChange={handleOnSelect}
                // specify functions that will be called when the dropdown menu opens
                onMenuOpen={handleOnChange}
                value={selection}
                aria-label="Single select"
                styles={customStyles}
                formatOptionLabel={formatOptionLabel}
                // autosize={true}
            />
            {error &&
                <p>You have exceeded the search limit of two searches per minute</p>
            }
        </section>
        <button
          type="button"
          onClick={handleClick}
        >
        Search
        </button>
    </form>
        </>
    );
}

export default SearchBar;

const customStyles = {
        control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minHeight: '30px',
        height: '30px',
        boxShadow: state.isFocused ? null : null,
        whiteSpace: 'nowrap',
        //Autosize width of screenbar
        width: useScreenSize().width/700 * 180,
        minWidth: 30
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: '30px',
        padding: '0 -10px',
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',
    }),
    menu: (base) => ({
        ...base,
        minWidth: "150px",
        maxWidth: "74%"
   }),
};

const formatOptionLabel = (value) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    flexGrow: '1',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    paddingRight: 7
                }}
            >
                {value.label}
            </div>
            <div style={{ textAlign: 'right', color: 'green' }}>
                {value.value}
            </div>
        </div>
    )
}