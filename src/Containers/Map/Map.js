import React from "react";
import { MapContainer, TileLayer, useMap, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import numeral from "numeral"

import classes from './Map.module.css';

const Map = ({ zoom, center, countries, casesType = 'cases' }) => {

    const MyComponent = () => {
        const map = useMap()
        map.setView(center, zoom);
        return null;
    }

    const casesTypeColors = {
        cases: {
            hex: "#CC1034",
            multiplier: 350,
        },
        recovered: {
            hex: "#7dd71d",
            multiplier: 350,
        },
        deaths: {
            hex: "#fb4443",
            multiplier: 1000,
        },
    };

    return (
        <div className={classes.Map}>
            <MapContainer
                style={{ height: "100%" }}
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}>
                <MyComponent center={center} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {countries.map((country, index) => (
                    <Circle
                        center={[country.countryInfo.lat, country.countryInfo.long]}
                        key={index}
                        fillOpacity="0.4"
                        pathOptions={{
                            color: casesTypeColors[casesType].hex,
                            fillColor: casesTypeColors[casesType].hex
                        }}
                        radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
                    >
                        <Popup>
                            <div className={classes.Popup}>
                                <div className={classes.Flag} style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                                <div className={classes.Country}>
                                    {country.country}
                                </div>
                                <div className={classes.Info}>
                                    <p>Cases:</p>
                                    <p>{numeral(country.cases).format('0,0')}</p>
                                </div>
                                <div className={classes.Info}>
                                    <p>Recovered:</p>
                                    <p>{numeral(country.recovered).format('0,0')}</p>
                                </div>
                                <div className={classes.Info}>
                                    <p>Deaths:</p>
                                    <p>{numeral(country.deaths).format('0,0')}</p></div>
                            </div>
                        </Popup>
                    </Circle>
                ))}
            </MapContainer>
        </div>
    )
}

export default React.memo(Map)

