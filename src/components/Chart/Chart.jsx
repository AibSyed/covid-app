import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

function Chart() {
	//here we use state hook
	const [dailyData, setDailyData] = useState([]);

	useEffect(()=> {
		const fetchAPI = async () => {
			setDailyData(await fetchDailyData());
		}

		fetchAPI();
	 });
	 
	 const lineChart =
			//if data from daily data is not (truthy) 0 then show chart
			dailyData.length ? ( //if 0 it's falsy and won't show chart
				<Line
					data={{
						//get all dates from dailyData and display as labels
						labels: dailyData.map(({ date }) => date),
						//api does not provide daily data for recovered
						datasets: [
							{
								data: dailyData.map(({ confirmed }) => confirmed),
								label: 'Infected',
								borderColor: '#1a1d28',
								fill: true,
							},
							{
								data: dailyData.map(({ deaths }) => deaths),
								label: 'Deaths',
								borderColor: '#e73629',
								backgroundColor: '#e7362980',
								fill: true,
							},
						],
					}}
				/>
			) : null;

	return (
		<div className={styles.container}>
			{lineChart}
		</div>
	);
}

export default Chart;
