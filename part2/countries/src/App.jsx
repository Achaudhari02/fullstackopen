import { useState, useEffect } from "react";
import countryService from "./services/countryService"
import Countries from "./components/Countries";

const App = () => {
  useEffect(() => {
    countryService
      .getAll()
      .then((res) => {
        console.log(res[0].name.common)
        setCountries(res);
      })
  }, []);

  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [displayCountries, setDisplayCountries] = useState([])

  const handleSearch  = (event) => {
    // console.log(event.target.value)
    const searchText = event.target.value
    const searchResults = countries
                            .filter((country) => {
                              return (
                                country.name.common
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                              )
                            })
    setSearchValue(event.target.value)
    setDisplayCountries(searchResults);
    console.log(searchResults)
  }

  return (
    <div>
      Search: <input value={searchValue} onChange={handleSearch}></input>
      {/* {console.log({searchValue})} */}
      <Countries display={displayCountries} />
    </div>
  );
};

export default App;
