import axios from 'axios';
import { getKeyValue, TOKEN_DICITIONARY } from './storage.service.mjs';

const getWeather = async (city) => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICITIONARY.token);

	if (!token)  {
		throw new Error('Key not set, ask it through comman -t [API_KEY]');
	}

	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?`;

	const { data } = await axios.get(url, {
		params: {
			key: token,
		}
	});
	return data;
	console.log("Result", data);
};
export { getWeather };

// TOKEN WDGHPQ89SQ74469LRWU2N3BL7