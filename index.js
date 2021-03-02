const express = require('express');
const app = express();
const winston = require('winston');
const debug = require('debug')('app:main');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// check if all configuration settings are ok
require('./startup/config.js')();

// setup error logging (should be set up first so that all errors are handled)
require('./startup/logging.js')();

// setup and connect to database
require('./startup/db.js')();

// setup all routes
require('./startup/routes.js')(app);

// Listen
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	winston.info(`Listening on Port: ${PORT}`);
});
