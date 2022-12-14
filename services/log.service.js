import chalk from 'chalk'
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(`${chalk.bgRed(' ERROR ')} ${error}`);
};

const printSuccess = (message) => {
	console.log(`${chalk.bgGreen(' SUCCESS ')} ${message}`);
};

const printHelp = (message) => {
	console.log(
		dedent `
		 ${chalk.bgBlue(' HELP ')}
		 No parameter - enter weather
		 -s [CITY] for install city
		 -h for enter helper
		 -t [API_KEY] for safe token
	 	`
	 );
};

const printWeather = (res) => {
	console.log(
		dedent`${chalk.bgYellow(' WEATHER ')} Weather in city ${res.resolvedAddress}
		${getIcon(res.days[0].icon)} ${ res.days[0].description}
		Temperature: ${getTemperatureGraduce(res.days[0].temp)}
		Speed wind: ${res.days[0].windspeed} m/c
		Humidity: ${res.days[0].humidity} %
		`
	)
}

function getTemperatureGraduce(temp) {
	return (temp - 32) / 1,8;
}

const getIcon = (icon) => {
	switch (icon) {
		case 'sunny':
			return 'âī¸ ';
		case '02':
			return 'đ¤ī¸ ';
		case 'cloud':
			return 'âī¸ ';
		case '04':
			return 'âī¸ ';
		case '09':
			return 'đ§ī¸ ';
		case '10':
			return 'đĻī¸ ';
		case '11':
			return 'đŠī¸ ';
		case 'snow':
			return 'âī¸ ';
		case '50':
			return 'đĢī¸ ';
		default:
			return '';
	}
}


export { printError, printSuccess, printHelp, printWeather, };