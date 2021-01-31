import React from 'react';

import classes from './Table.module.css';
import Aux from "../../../hoc/Auxiliry/Auxiliry";

const Table = ({ tableInfo }) => {
    return (
        <Aux>
            <h3>Live cases by country</h3>
            <div className={classes.Table}>
                <table>
                    <tbody>
                        {tableInfo.map((element, index) => (
                            <tr key={index}>
                                <td>
                                    {element.country}
                                </td>
                                <td>
                                    <strong>
                                        {element.cases}
                                    </strong>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Aux>
    )
}

export default Table
