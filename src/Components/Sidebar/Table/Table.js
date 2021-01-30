import React from 'react';

import classes from './Table.module.css';

const Table = ({ tableInfo }) => {
    return (
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
    )
}

export default Table
