import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import { Typography } from '@material-ui/core';

class App extends React.Component {
	state = {
		//data object is populated in componentDidMount
		data: {},
		country: '',
	};
	//componentDidMount is making a request to fetchData
	async componentDidMount() {
		const fetchedData = await fetchData();

		this.setState({ data: fetchedData });
	}
	//country is set as parameter and then makes one more request to fetchData where it also changes the country
	handleCountryChange = async (country) => {
		const fetchedData = await fetchData(country);

		this.setState({ data: fetchedData, country: country });
		//fetch data
		//set state
	};

	//once data is fetched it is set as state
	//data is then passed down as props
	render() {
		//destructure data and country
		const { data, country } = this.state;
		return (
			<div className={styles.container}>
				<Typography color="textPrimary">
					<h1>COVID-19 Dashboard</h1>
				</Typography>
				<Cards data={data} />
				<CountryPicker handleCountryChange={this.handleCountryChange} />
				<Chart data={data} country={country} />
			</div>
		);
	}
}

export default App;
