import React, { useState, useEffect } from "react";

import Header from "./Containers/Header/Header";
import axios from "./axios";
import InfoBoxes from "./Components/InfoBoxes/InfoBoxes";
import Map from "./Components/Map/Map";
import classes from "./App.module.css";
import Sidebar from "./Components/Sidebar/Sidebar"

function App() {
    const [countryInfo, setCountryInfo] = useState({});

    useEffect(() => {
        axios.get('/all')
            .then(response => {
                setCountryInfo(response.data)
            })
            ;
    }, [])

    const onSelectCountry = (value) => {
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

    return (
        <div className={classes.App}>
            <div className={classes.Left}>
                <Header specificCountry={onSelectCountry} />
                <InfoBoxes info={countryInfo} />
                <Map />
            </div>
            <div className={classes.Right}>
                <Sidebar />
            </div>

        </div>
    );
}

export default App;
