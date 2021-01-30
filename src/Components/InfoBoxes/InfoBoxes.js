import React from 'react';

import InfoBox from './InfoBox/InfoBox';
import classes from "./InfoBoxes.module.css";

const InfoBoxes = ({ info }) => {
    return (
        <div className={classes.InfoBoxes}>
            <InfoBox
                title="Coronavirus Cases"
                cases={info.todayCases}
                total={info.cases} />
            <InfoBox
                title="Recovered"
                cases={info.todayRecovered}
                total={info.recovered} />
            <InfoBox
                title="Deaths"
                cases={info.todayDeaths}
                total={info.deaths} />
        </div>
    )
}

export default InfoBoxes;