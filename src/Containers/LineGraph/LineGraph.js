import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from "numeral";

import axios from "../../axios";
import classes from './LineGraph.module.css';
import Aux from '../../hoc/Auxiliry/Auxiliry'

const LineGraph = ({ casesType, country }) => {

    const [dates, setDates] = useState(null);
    const [statistics, setStatistics] = useState(null);

    const options = {
        legend: {
            display: false,
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        parser: "MM/DD/YY",
                        tooltipFormat: "ll",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return numeral(value).format("0a");
                        },
                    },
                },
            ],
        },
    };

    const buildChartData = (data, type) => {
        const chartData = data[type];
        const x_Axis = Object.keys(chartData);
        const y_Axis = [];
        let lastPointData;
        for (let key in data[type]) {
            if (lastPointData) {
                y_Axis.push(Math.abs(data[type][key] - lastPointData))
            }
            lastPointData = data[type][key]
        }
        return [x_Axis, y_Axis]
    }

    useEffect(() => {
        const numberOfDays = Math.ceil((new Date().getTime() - new Date(2020, 1, 22).getTime()) / (1000 * 60 * 60 * 24));
        if (country === 'worldwide') {
            axios.get(`/historical/all?lastdays=${numberOfDays}`)
                .then(response => {
                    const [dates, statistics] = buildChartData(response.data, casesType);
                    setDates(dates)
                    setStatistics(statistics);
                })
        } else {
            axios.get(`/historical/${country}?lastdays=360`)
                .then(response => {
                    const [dates, statistics] = buildChartData(response.data.timeline, casesType);
                    setDates(dates)
                    setStatistics(statistics);
                })
        }
    }, [casesType, country]);

    const casesTypeColors = {
        cases: {
            hex: "#CC1034",
            half_op: "rgba(204, 16, 52, 0.5)"
        },
        recovered: {
            hex: "#7dd71d",
            half_op: "rgba(125, 215, 29, 0.5)"
        },
        deaths: {
            hex: "#fb4443",
            half_op: "rgba(251, 68, 67, 0.5)"
        },
    };

    const data = {
        labels: dates,
        datasets: [
            {
                data: statistics,
                backgroundColor: casesTypeColors[casesType].half_op,
                borderColor: casesTypeColors[casesType].hex,
            },
        ],
    }

    return (
        <Aux>
            <h3 className={classes.Heading}>{country} {country === 'worldwide' ? null : 'all'} COVID-19 {casesType}</h3>
            <div className={classes.LineGraph}>
                <Line data={data} options={options} />
            </div>
        </Aux>

    )
}

export default React.memo(LineGraph);

/*
w brdo 7war el background image w tzbeet ela3laam
ezay a3ml close ll popup lma agi aft7 el countries menue
7war elarqam ely msh zabta bta3t el charts
ezay akhli elpage kolha mwgoda ela el screen with no scrolling
7war el dash ely fl classes bta3 el css
handling el select element w el card elements with responsive lma el screen tkon a2l mn 600px
*/