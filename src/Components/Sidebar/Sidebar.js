import { Card, CardContent } from '@material-ui/core'
import React from 'react'

const Sidebar = () => {
    return (
        <Card >
            <CardContent>
                <h3>Live cases by country</h3>
                {/*table*/}
                <h3>Worldwide new cases</h3>
                {/*graph*/}
            </CardContent>
        </Card> 
    )
}

export default Sidebar
