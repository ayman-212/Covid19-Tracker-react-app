import React, { useState, useEffect } from "react";

import Header from "./Components/Header/Header";
import axios from "./axios";
import InfoBoxes from "./Components/InfoBoxes/InfoBoxes";
import Map from "./Components/Map/Map";
import classes from "./App.module.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Aux from "./hoc/Auxiliry/Auxiliry";

function App() {
    const [countries, setCountries] = useState(null);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState(null);
    const [tableData, setTableData] = useState(null);

    const countryChangeHandler = (event) => {
        const value = event.target.value
        setCountry(value);
        const url = value === "worldwide" ?
            "/all"
            :
            `/countries/${value}?strict=true`
            ;

        axios.get(url)
            .then(response => {
                setCountryInfo(response.data)
            })
            ;
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
                const fetchedTableData = response.data.sort((a, b) =>
                    b.cases - a.cases)
                setTableData(fetchedTableData);
            })
            ;
        axios.get('/all')
            .then(response => {
                setCountryInfo(response.data)
            })
            ;
    }, [])

    return (
        <div className={classes.App}>
            {
                countries && countryInfo && tableData ?
                    <Aux>
                        <div className={classes.Left}>
                            <Header
                                countries={countries}
                                country={country}
                                onCountryChange={countryChangeHandler} />
                            <InfoBoxes info={countryInfo} />
                            <Map />
                        </div>
                        <div className={classes.Right}>
                            <Sidebar data={tableData} />
                        </div>
                    </Aux>
                    :
                    null
            }
        </div>
    );
}

export default App;