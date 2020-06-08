import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import { Typography } from '@material-ui/core';

import covidimage from './images/covid-19-virus.jpg';

class App extends React.Component {
	state = {
		data: {},
		country: '',
	};

	async componentDidMount() {
		const fetchedData = await fetchData();

		this.setState({ data: fetchedData });
	}

	handleCountryChange = async (country) => {
		const fetchedData = await fetchData(country);

		this.setState({ data: fetchedData, country: country });
		//fetch data
		//set state
	};

	render() {
		const { data, country } = this.state;
		return (
			<div className={styles.container}>
				<Typography color="textPrimary">
					<h1>Covid-19 Dashboard</h1>
				</Typography>
				<Cards data={data} />
				<CountryPicker handleCountryChange={this.handleCountryChange} />
				<Chart data={data} country={country} />
			</div>
		);
	}
}

export default App;
