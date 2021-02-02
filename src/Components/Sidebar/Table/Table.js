import React from 'react';
import numeral from 'numeral';

import classes from './Table.module.css';
import Aux from "../../../hoc/Auxiliry/Auxiliry";

const Table = ({ tableInfo }) => {
    return (
        <Aux>
            <h3 className={classes.Heading}>Live cases by country</h3>
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
                                        {numeral(element.cases).format('0,0')}
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
