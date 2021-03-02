const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = () => {
	mongoose
		.connect(config.get('db.connStr'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			winston.info('Connected to the database');
		});
};
