import React from 'react';
import { Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

function Chart({ data: { confirmed, recovered, deaths }, country }) {
	//if there is no confirmed data then show 'Loading...'
	if (!confirmed) {
		return 'Loading...';
	}

	//show bar chart using current data
	const barChart = confirmed ? (
		<Bar
			data={{
				labels: ['Infected', 'Recovered', 'Fatalities'],
				datasets: [
					{
						label: 'People',
						backgroundColor: ['#ef9730', '#201d72', '#e62000'],
						data: [confirmed.value, recovered.value, deaths.value],
					},
				],
			}}
			options={{
				legend: { display: false },
				title: { display: true, text: `Current state in ${country}` },
			}}
		/>
	) : null;

	const globalBarChart = confirmed ? (
		<Bar
			data={{
				labels: ['Infected', 'Recovered', 'Fatalities'],
				datasets: [
					{
						label: 'People',
						backgroundColor: ['#ef9730', '#201d72', '#e62000'],
						data: [confirmed.value, recovered.value, deaths.value],
					},
				],
			}}
			options={{
				legend: { display: false },
				title: { display: true, text: `Global Data` },
			}}
		/>
	) : null;

	return (
		<div className={styles.container}>
			{country ? barChart : globalBarChart}
		</div>
	);
};

export default Chart;
