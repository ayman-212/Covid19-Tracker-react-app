import React from 'react';
import { Card, CardContent } from '@material-ui/core';

import Table from "./Table/Table";
import LineGraph from '../../Containers/LineGraph/LineGraph';

const Sidebar = ({ data, casesType, country }) => {
    return (
        <Card >
            <CardContent>
                <Table tableInfo={data} />
                <LineGraph casesType={casesType} country={country} />
            </CardContent>
        </Card>
    )
}

export default React.memo(Sidebar) 
