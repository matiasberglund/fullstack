import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${process.env.MAADATA_API_KEY}`)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.log('Error fetching weather:', error);
      });
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area.toLocaleString()} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(l => (
          <li>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" />
      {weather && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>temperature {weather.main.temp} Celsius</p>
            <img width={50} height={50} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather icon" />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;