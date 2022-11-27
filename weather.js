#!/usr/bin/env node
import { getArgs } from './helpers/args.mjs'
import { getWeather } from './services/api.service.js';
import { printHelp, printError, printSuccess, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICITIONARY } from './services/storage.service.mjs';

const saveToken = async (token) => {
	if (!token.length) {
		printError("Not send token!");
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICITIONARY.token, token);
		printSuccess('Токен сохранён');
	} catch (e) {
		printError(e.message);
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError("Not send city!");
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICITIONARY.city, city);
		printSuccess('City save');
	} catch (e) {
		printError(e.message);
	}
}

const getForcast = async  () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICITIONARY.city);
		const weather = await getWeather(city);
		printWeather(weather);
	} catch (e) {
		if (e?.response?. status === 404) {
			printError('Wrong set city');
		} else if (e?.response?.status == 401) {
			printError('Wrong set token');
		} else {
			printError('Result', e.message);
		}
	}
	
}

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		// Enter help
		return printHelp();
	}
	if (args.s) {
		// Safe city
		return saveCity(args.s)
	}
	if (args.t) {
		// Safe token
		return saveToken(args.t);
		}
	// Enter weather
	return getForcast();
};

initCLI();