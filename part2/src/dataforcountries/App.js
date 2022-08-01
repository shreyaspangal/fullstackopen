import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";

const App = () => {
  let [countries, setCountries] = useState([]);
  let [filter, setFilter] = useState("");
  let [showBtn, setShowBtn] = useState(false);
  // let [countryId, setCountryId] = useState(null);
  // let [weather, setWeather] = useState([]);

  const URL = "https://restcountries.com/v3.1/all";
  // const api_key = process.env.REACT_APP_API_KEY;
  // const getWeather = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${api_key}`;

  // Load country data from json server into countries
  useEffect(() => {
    axios.get(URL).then((res) => {
      setCountries(res.data);
    });
  }, []);

  // Load weather data from json server into countries
  // useEffect(() => {
  //   countries.map(country => {
  //     const [lat, lng] = country.capitalInfo.latlng;

  //     axios.get(getWeather).then((res) => {
  //       console.log(res)
  //     });
  //   })
  // }, []);

  const filteredCountries = countries.filter((country) => {
    return Object.values(country.name)
      .join("")
      .toLowerCase()
      .includes(filter.toLowerCase());
  });

  // Helper function
  const countryDetails = (country) => {
    // Returns array with languages values as string
    const getLanguages = Object.values(country.languages) || ['Not available'];

    return (
      <div key={country.cca2}>
        <h2>{country.name.official}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <p>
          <strong>Languages:</strong>
        </p>
        <ul>
          {getLanguages.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <img src={country.coatOfArms.png} alt="flag" width="50" />
      </div>
    );
  }

  const handleShowBtn = (id) => {
    // setCountryId(id);
    setShowBtn(!showBtn);
  }

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
          <span>{!showBtn && country.name.official}</span> &nbsp;
          {/* Display country details when clicked on Show Btn*/}
          {showBtn && countryDetails(country)}
          <Button text={showBtn ? 'Hide' : 'Show'} onClick={() => handleShowBtn(country.cca2)} />
        </div>
      ));
    }
    if (filteredCountries.length === 1) {
      return filteredCountries.map((country) => countryDetails(country));
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
