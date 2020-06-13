import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';


import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);


//fetchDailyData is historic data from the api that is being used for line chart
//data is looped over with .map and displayed using react-chartjs-2 library
  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#ef9730',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Fatalities',
              borderColor: '#e62000',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
        options={{
          legend: { display: true },
          title: { display: true, text: `Global Data` },
        }} 
      />
    ) : null
  );

 //show bar chart using current data
  const barChart = (
    confirmed ? (
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
    ) : null
  );
  
//when country is chosen from drop down show a bar chart, else show line chart
  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}

    </div>
  );
};

export default Chart;
