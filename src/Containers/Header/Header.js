import React, { useState, useEffect } from 'react';
import {
    FormControl,
    Select,
    MenuItem
} from '@material-ui/core';

import classes from "./Header.module.css";
import axios from "../../axios";

const Header = () => {

    const [countries, setCountries] = useState(null);
    const [country, setCountry] = useState("worldwide");

    const onCountryChange = (event) => {
        setCountry(event.target.value)
    }

    useEffect(() => {
        axios.get('/countries')
            .then(response => {
                const fetchedCountries = response.data.map(fetchedCountry => {
                    return {
                        name: fetchedCountry.country,
                        value: fetchedCountry.countryInfo.iso2
                    }
                })
                setCountries(fetchedCountries);
            })
    }, [])
    
    return (
        <div className={classes.Header}>
            <h1>Covid-19 Tracker</h1>
            {countries ?
                <FormControl>
                    <Select
                        variant="outlined"
                        value={country}
                        onChange={onCountryChange}>
                        <MenuItem value="worldwide">Worldwide</MenuItem>
                        {countries.map((country, index) => (
                            <MenuItem
                                value={country.value}
                                key={index}
                            >{country.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                :
                null
            }
        </div>
    )
}


export default Header;