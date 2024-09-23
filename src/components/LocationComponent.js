import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../assets/css/chatbot.css";

const LocationComponent = () => {
  // Configuration for API URL and Key
  const config = {
    cUrl: "https://api.countrystatecity.in/v1/countries",
    ckey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
  };

  // State to hold countries, states, and cities
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // State to track selected country and state
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  // Load countries on component mount
  useEffect(() => {
    const loadCountries = () => {
      fetch(config.cUrl, {
        headers: { "X-CSCAPI-KEY": config.ckey },
      })
        .then((response) => response.json())
        .then((data) => {
          const countryOptions = data.map((country) => ({
            value: country.iso2,
            label: country.name,
          }));
          setCountries(countryOptions);
        })
        .catch((error) => console.error("Error loading countries:", error));
    };

    loadCountries();
  }, [config.cUrl, config.ckey]);

  // Load states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      const loadStates = () => {
        fetch(`${config.cUrl}/${selectedCountry.value}/states`, {
          headers: { "X-CSCAPI-KEY": config.ckey },
        })
          .then((response) => response.json())
          .then((data) => {
            const stateOptions = data.map((state) => ({
              value: state.iso2,
              label: state.name,
            }));
            setStates(stateOptions);
            setCities([]); // Clear city options when a new country is selected
          })
          .catch((error) => console.error("Error loading states:", error));
      };

      loadStates();
    }
  }, [selectedCountry, config.cUrl, config.ckey]);

  // Load cities when a state is selected
  useEffect(() => {
    if (selectedState && selectedCountry) {
      const loadCities = () => {
        fetch(
          `${config.cUrl}/${selectedCountry.value}/states/${selectedState.value}/cities`,
          {
            headers: { "X-CSCAPI-KEY": config.ckey },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            const cityOptions = data.map((city) => ({
              value: city.iso2,
              label: city.name,
            }));
            setCities(cityOptions);
          })
          .catch((error) => console.error("Error loading cities:", error));
      };

      loadCities();
    }
  }, [selectedState, selectedCountry, config.cUrl, config.ckey]);

  return (
    <div className="container">
      <h3>Select Country, State, and City</h3>

      <div className="select_option">
        {/* Country Select */}
        <Select
          className="country-select"
          options={countries}
          value={selectedCountry}
          onChange={setSelectedCountry}
          placeholder="Select Country"
          isSearchable
        />

        {/* State Select */}
        <Select
          className="state-select"
          options={states}
          value={selectedState}
          onChange={setSelectedState}
          placeholder="Select State"
          isSearchable
          isDisabled={!selectedCountry}
        />

        {/* City Select */}
        <Select
          className="city-select"
          options={cities}
          value={null}
          onChange={() => {}}
          placeholder="Select City"
          isSearchable
          isDisabled={!selectedState}
        />
      </div>
    </div>
  );
};

export default LocationComponent;
