import React from 'react';

import InfoBox from './InfoBox/InfoBox';
import classes from "./InfoBoxes.module.css";

const InfoBoxes = ({ info, cardClicked, casesType }) => {
    return (
        <div className={classes.InfoBoxes}>
            <InfoBox
                title="Coronavirus Cases"
                cases={info.todayCases}
                total={info.cases}
                clicked={() => cardClicked('cases')}
                active={casesType === 'cases'}
            />
            <InfoBox
                title="Recovered"
                cases={info.todayRecovered}
                total={info.recovered}
                clicked={() => cardClicked('recovered')}
                active={casesType === 'recovered'}
            />
            <InfoBox
                title="Deaths"
                cases={info.todayDeaths}
                total={info.deaths}
                clicked={() => cardClicked('deaths')}
                active={casesType === 'deaths'}
            />
        </div>
    )
}

export default InfoBoxes;