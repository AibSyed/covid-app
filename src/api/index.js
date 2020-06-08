import axios from 'axios';
//axios will be used to make api calls

const url = 'https://covid19.mathdro.id/api';

//try will execute if fetch is successful, otherwise error will prompt
//fields are destructured from data object so we dont have to say data.confirm, data.recovered etc...
export const fetchData = async (country) => {
	let variableURL = url;

	if (country) {
		variableURL = `{url}/countries/${country}`;
	}

	try {
		const {
			data: { confirmed, recovered, deaths, lastUpdate },
		} = await axios.get(variableURL);

		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		console.log(error);
	}
};

export const fetchDailyData = async () => {
	try {
		const { data } = await axios.get(`${url}/daily`);

		const modifiedData = data.map((dailyData) => ({
			confirmed: dailyData.confirmed.total,
			deaths: dailyData.deaths.total,
			date: dailyData.reportDate,
		}));

		return modifiedData;
	} catch (error) {}
};

export const fetchCountries = async () => {
	try {
		const {
			data: { countries },
		} = await axios.get(`${url}/countries`);
		return countries.map((country) => country.name);
	} catch (error) {
		console.log(error);
	}
};
