import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.log('Error fetching countries:', error);
      });
  }, []);

  const handleFilterChange = event => {
    setFilter(event.target.value);
    setSelectedCountry(null);
  };

  const handleCountryClick = country => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <div>
        {(filteredCountries.length <= 10 && !selectedCountry) && (
          <CountryList countries={filteredCountries} handleCountryClick={handleCountryClick} />
        )}
        {filteredCountries.length > 10 && !selectedCountry && (
          <p>Too many matches, specify another filter</p>
        )}
        {selectedCountry && (
          <CountryDetails country={selectedCountry} />
        )}
      </div>
    </div>
  );
};

export default App;