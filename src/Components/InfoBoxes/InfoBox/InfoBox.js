import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import numeral from 'numeral';

import classes from "./InfoBox.module.css";

const InfoBox = ({ title, cases, total, clicked, active }) => {

    return (
        <Card
            className={
                active ?
                    [classes.InfoBox, classes.Active].join(" ")
                    :
                    classes.InfoBox
            }
            onClick={clicked}>
            <CardContent>
                <Typography
                    className={classes.InfoBoxTitle}
                    color="textSecondary">
                    {title}
                </Typography>
                <h2 >{numeral(cases).format('+0a.0')}</h2>
                <Typography
                    className={classes.InfoBoxTotal}
                    color="textSecondary">
                    {numeral(total).format('0.0a')}{"  "}Total
                </Typography>
            </CardContent>

        </Card>
    )
}

export default InfoBox;