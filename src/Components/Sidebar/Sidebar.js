import React from 'react';
import { Card, CardContent } from '@material-ui/core';

import Table from "./Table/Table";
import LineGraph from './LineGraph/LineGraph';

const Sidebar = ({ data, x_Axis, y_Axis }) => {
    return (
        <Card >
            <CardContent>
                <Table tableInfo={data} />
                <LineGraph />
            </CardContent>
        </Card>
    )
}

export default Sidebar
