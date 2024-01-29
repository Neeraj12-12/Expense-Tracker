import React, { useState } from 'react';

const countries = ["United States", "Canada", "Mexico"]; // Add all countries
const countryToCurrency = {
  "United States": "USD",
  "Canada": "CAD",
  "Mexico": "MXN",
  // Add more mappings as needed
};

const CountryCurrency = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currency, setCurrency] = useState('');

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setCurrency(countryToCurrency[event.target.value]);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(selectedCountry, { style: 'currency', currency: currency }).format(value);
  };

  return (
    <div>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <p>The currency for {selectedCountry} is {currency}</p>
      <p>{formatCurrency(1234.56)}</p>
    </div>
  );
};

export default CountryCurrency;