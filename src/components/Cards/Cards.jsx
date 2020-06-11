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
	
//render 3 different cards using current data
    return (
			<div className={styles.container}>
				<Grid container spacing={3} justify="center">
					<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Infected
							</Typography>
							<Typography variant="h5">
                                <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
                            
                            </Typography>
                            {/* Refactor {last update to be more legible with Date function*/}
							<Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
							<Typography variant="body2">
								Current Active COVID-19 cases
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
							<Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
							<Typography variant="body2">
								Current Number of Recoveries from COVID-19
							</Typography>
						</CardContent>
					</Grid>
					<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Deaths
							</Typography>
                            							<Typography variant="h5">
                                <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
                            
                            </Typography>
							<Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
							<Typography variant="body2">
								Current number of Deaths from COVID-19
							</Typography>
						</CardContent>
					</Grid>
				</Grid>
			</div>
		);
}

export default Cards;
