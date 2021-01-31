import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from "numeral";

import axios from "../../../axios";
import classes from './LineGraph.module.css';
import Aux from '../../../hoc/Auxiliry/Auxiliry'

const LineGraph = ({ caseType = 'cases' }) => {

    const [dates, setDates] = useState(null);
    const [statistics, setStatistics] = useState(null);

    const buildChartData = (data, type) => {
        const chartData = data[type];
        const x_Axis = Object.keys(chartData);
        const y_Axis = [];
        let lastPointData;
        for (let key in data[type]) {
            if (lastPointData) {
                y_Axis.push(data[type][key] - lastPointData)
            }
            lastPointData = data[type][key]
        }
        return [x_Axis, y_Axis]
    }

    useEffect(() => {
        axios.get('/historical/all?lastdays=120')
            .then(response => {
                const [dates, statistics] = buildChartData(response.data, caseType);
                setDates(dates)
                setStatistics(statistics);
            })
    }, [caseType])

    const data = {
        labels: dates,
        datasets: [
            {
                data: statistics,
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
            },
        ],
    }

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

    return (
        <Aux>
            <h3>Worldwide new cases</h3>
            <div className={classes.LineGraph}>
                <Line data={data} options={options} />
            </div>
        </Aux>

    )
}

export default LineGraph;

/* es2l 7ssein 3la el package bta3t chart.js w 3la 7war el componentdidmount >>>
useEffect(()=>{},[casesType])*/