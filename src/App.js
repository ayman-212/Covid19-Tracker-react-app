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
    const [mapCenter, setMapCenter] = useState([34.8, -40.5]);
    const [mapZoom, setMapZoom] = useState(3);
    const [mapContries, setMapCountries] = useState(null);
    const [casesType, setCasesType] = useState('cases');

    const countryChangeHandler = (event) => {
        const value = event.target.value
        setCountry(value);
        document.getElementById('map').click();
        const url = value === "worldwide" ?
            "/all"
            :
            `/countries/${value}?strict=true`
            ;

        axios.get(url)
            .then(response => {
                setCountryInfo(response.data)
                setMapZoom(4)
                if (url === "/all") {
                    setMapCenter([34.8, -40.5]);
                    setMapZoom(3);
                } else {
                    setMapCenter([response.data.countryInfo.lat, response.data.countryInfo.long]);
                    setMapZoom(4);
                }
            })
            ;
    }

    const onCardClickHandler = (type) => {
        setCasesType(type)
    }

    useEffect(() => {
        axios.get('/countries')
            .then(response => {
                const fetchedCountries = response.data.map(fetchedCountry => {
                    return {
                        name: fetchedCountry.country,
                        value: fetchedCountry.country
                    }
                })
                setCountries(fetchedCountries);
                const fetchedTableData = response.data.sort((a, b) =>
                    b.cases - a.cases)
                setTableData(fetchedTableData);
                setMapCountries(response.data)
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
                countryInfo && countries && mapContries && tableData ?
                    <Aux>
                        <div className={classes.Left}>
                            <Header
                                countries={countries}
                                country={country}
                                onCountryChange={countryChangeHandler} />
                            <InfoBoxes
                                info={countryInfo}
                                cardClicked={onCardClickHandler}
                                casesType={casesType} />
                            <Map
                                center={mapCenter}
                                zoom={mapZoom}
                                countries={mapContries}
                                casesType={casesType} />
                        </div>
                        <div className={classes.Right}>
                            <Sidebar
                                data={tableData}
                                casesType={casesType}
                                country={country} />
                        </div>
                    </Aux>
                    :
                    null
            }
        </div>
    );
}

export default App;