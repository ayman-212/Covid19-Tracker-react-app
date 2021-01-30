import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import classes from "./InfoBox.module.css";

const InfoBox = ({ title, cases, total }) => {
    return (
        <Card className={classes.InfoBox}>
            <CardContent>
                <Typography
                    className={classes.InfoBoxTitle}
                    color="textSecondary">
                    {title}
                </Typography>
                <h2>{cases}</h2>
                <Typography
                    className={classes.InfoBoxTotal}
                    color="textSecondary">
                    {total}Total
                </Typography>
            </CardContent>

        </Card>
    )
}

export default InfoBox;