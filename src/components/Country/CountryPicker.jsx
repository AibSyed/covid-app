import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);
//countries are being fetched from API (array of 180 countries)
  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect className={styles.countrySelect} defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        {/*instead of typing <option> 100 times, instead loop over each country with .map - once country is chosen it goes back to app.js through handleCountryChange */}
        <option className={styles.countryOption} value="">Global</option>
        {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;
