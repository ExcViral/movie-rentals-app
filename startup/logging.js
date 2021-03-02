const { format } = require('winston');
const winston = require('winston');

module.exports = () => {
	// setup Transports
	winston.add(new winston.transports.File({ filename: 'logFile.log' }));
	winston.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				// winston.format.json(),
				winston.format.simple()
			),
		})
	);

	// Handle Uncaught Exceptions and log them
	process.on('uncaughtException', ex => {
		winston.log('error', ex.message, ex);
		process.exit(1);
	});

	// Handle Uncaught Promise Rejections and log them
	process.on('unhandledRejection', ex => {
		winston.log('error', ex.message, ex);
		process.exit(1);
	});
};
