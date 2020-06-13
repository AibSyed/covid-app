import React from 'react'
import {Card, CardContent, Typography, Grid} from '@material-ui/core'
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css'

//cards data is coming from index.js using props
function Cards({data:{confirmed, recovered, deaths, lastUpdate}}) {
    //if there is no confirmed data then show 'Loading...'
    if(!confirmed) {
        return 'Loading...';
	}

    const totalCases = deaths.value + recovered.value + confirmed.value;

	const confirmedCalc = confirmed.value / (deaths.value + recovered.value + confirmed.value);

	const confirmedPercentage = ((confirmedCalc * 100).toFixed(1))		

	const recoveredCalc = recovered.value / (deaths.value + recovered.value + confirmed.value);

	const recoveredPercentage = ((recoveredCalc * 100).toFixed(1))	

	const deathCalc = deaths.value / (deaths.value + recovered.value + confirmed.value);

	const deathPercentage = ((deathCalc * 100).toFixed(1))

	
	
//render 3 different cards using current data
    return (
			<div className={styles.container}>
			<Grid style={{ padding: '0px 0px 20px 0px', textAlign: 'center' }} xs={12}>					<Typography variant="h6" color="textSecondary" gutterBottom> Total number of reported cases: &nbsp;<CountUp start={0} end={totalCases} duration={2.5} separator="," />
							</Typography>
							</Grid>
				<Grid container spacing={3} justify="center">
					<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Infected
							</Typography>
							<Typography variant="h5">
                                <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
							</Typography>
							<Typography variant="h6">
								<i>(<CountUp start={0} end={confirmedPercentage} duration={2.5} decimals={1} decimal="." suffix="%" />)</i>
							</Typography>
                            {/* Refactor {last update to be more legible with Date function*/}
							<Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
							<Typography variant="body2">
								Active COVID-19 cases
							</Typography>
						</CardContent>
					</Grid>
					<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Recovered
							</Typography>
                            <Typography variant="h5">
                            <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
                            </Typography>
							<Typography variant="h6">
								<i>(<CountUp start={0} end={recoveredPercentage} duration={2.5} decimals={1} decimal="." suffix="%" />)</i>
							</Typography>							
							<Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
							<Typography variant="body2">
								Recovored COVID-19 cases
							</Typography>
						</CardContent>
					</Grid>
					<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Fatalities
							</Typography>
                            <Typography variant="h5">
                        	<CountUp start={0} end={deaths.value} duration={2.5} separator="," />
                            </Typography>
							<Typography variant="h6">
								<i>(<CountUp start={0} end={deathPercentage} duration={2.5} decimals={1} decimal="." suffix="%" />)</i>
							</Typography>								
							<Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
							<Typography variant="body2">
								Fatal COVID-19 cases
							</Typography>
						</CardContent>
					</Grid>
				</Grid>			
			</div>
		);
}

export default Cards;
