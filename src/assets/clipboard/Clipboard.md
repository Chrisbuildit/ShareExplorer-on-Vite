const handleInputChange = async (e) => {
setQuery(e.target.value);
clearTimeout(inputTimer);
let timeout = setTimeout(() => {
console.log("FETCHING RESULTS");
axios
.get(
`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${e.target.value}&apikey=${apiKey}`
)
.then((res) => {
console.log(res.data);
setSearchResults(res.data);
});
}, 300);
setInputTimer(timeout);
};

Nav-bar alternative

<div>
  <span>

<button1
type='button'>
Button
</button1>

<button2
type='button'>
Button
</button2>

  </span>
</div>