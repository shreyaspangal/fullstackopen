import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  let [countries, setCountries] = useState([]);
  let [filter, setFilter] = useState("");
  let [showBtn, setShowBtn] = useState(false);

  const URL = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios.get(URL).then((res) => {
      setCountries(res.data);
    });
  }, []);

  // Helper function
  const filteredCountries = countries.filter((country) => {
    return Object.values(country.name)
      .join("")
      .toLowerCase()
      .includes(filter.toLowerCase());
  });

  let countriesToShow = () => {
    // Initial state
    if (!filter) {
      return <strong>Type in the search bar for results...</strong>;
    }
    if (filteredCountries.length > 10) {
      return <strong>Too many matches, specify another filter</strong>;
    }
    if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
      return filteredCountries.map((country) => (
        <div key={country.cca2}>
          <span>{country.name.official}</span> &nbsp;
          <button onClick={() => setShowBtn(!showBtn)}>Show</button>
        </div>
      ));
    }
    if (filteredCountries.length === 1) {
      let getLanguages = filteredCountries.map((country) =>
        Object.values(country.languages)
      );

      return filteredCountries.map((country) => (
        <div key={country.cca2}>
          <h2>{country.name.official}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <p>
            <strong>Languages:</strong>
          </p>
          <ul>
            {getLanguages.map((items) => {
              return items.map((item) => {
                return <li key={item}>{item}</li>;
              });
            })}
          </ul>
          <img src={country.coatOfArms.png} alt="flag" width="50" />
        </div>
      ));
    }
  };

  return (
    <>
      <p>
        Find countries:{" "}
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </p>
      <div>{countriesToShow()}</div>
    </>
  );
};

export default App;
