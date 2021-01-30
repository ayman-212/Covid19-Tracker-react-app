import React from 'react';
import { Card, CardContent } from '@material-ui/core';

import Table from "./Table/Table";

const Sidebar = ({ data }) => {
    return (
        <Card >
            <CardContent>
                <h3>Live cases by country</h3>
                <Table tableInfo={data} />
                {/*table*/}
                <h3>Worldwide new cases</h3>
                {/*graph*/}
            </CardContent>
        </Card>
    )
}

export default Sidebar
