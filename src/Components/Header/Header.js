import React from 'react';
import {
    FormControl,
    Select,
    MenuItem
} from '@material-ui/core';

import classes from "./Header.module.css";

const Header = ({ countries, country, onCountryChange }) => {

    return (
        <div className={classes.Header}>
            <h1>Covid-19 Tracker</h1>
            <FormControl >
                <Select
                    className={classes.Dropdown}
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
        </div>
    )
}

export default Header;