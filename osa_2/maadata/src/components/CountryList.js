const CountryList = ({ countries, handleCountryClick }) => {
  return (
    <div>
      {countries.map(country => (
        <p key={country.ccn3}>
          {country.name.common}
          <button onClick={() => handleCountryClick(country)}>Show</button>
        </p>
      ))}
    </div>
    
  );
}

export default CountryList