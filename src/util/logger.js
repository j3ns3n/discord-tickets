const dateformat = require('dateformat');
const chalk = require('chalk');
const util = require('util');

module.exports.info = (...message) => {
	message = message.map((v) => typeof (v) !== 'string' ? util.inspect(v) : v).join(' ');
	console.log(chalk.blue(dateformat(Date.now(), 'mm/dd/yyyy hh:MM:ss TT')) + ' - ' + chalk.green('[INFO]') + ' ' + message);
};

module.exports.warn = (...message) => {
	message = message.map((v) => typeof (v) !== 'string' ? util.inspect(v) : v).join(' ');
	console.log(chalk.blue(dateformat(Date.now(), 'mm/dd/yyyy hh:MM:ss TT')) + ' - ' + chalk.yellow('[WARN]') + ' ' + message);
};

module.exports.error = (...message) => {
	message = message.map((v) => typeof (v) !== 'string' ? util.inspect(v) : v).join(' ');
	console.log(chalk.blue(dateformat(Date.now(), 'mm/dd/yyyy hh:MM:ss TT')) + ' - ' + chalk.red('[ERROR]') + ' ' + message);
};
