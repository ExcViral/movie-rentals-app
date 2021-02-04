const express = require('express');
const app = express();
const debug = require('debug')('app:main');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// check if all environment variables are set
// for json web token private key
if (!config.get('jwt.pkey')) {
	console.error('FATAL ERROR: vidly_jwtpkey is not defined');
	process.exit(1);
}

// connect to db
const connStr = config.get('db.connStr');
debug(`connection string: ${connStr}`);

mongoose
	.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		debug('Connected to the database');
	})
	.catch(err => {
		console.log('Could not connect to mongoDB', err);
	});

// middleware imports
const errorMiddleware = require('./middlewares/error.js');

// router imports
const genresAPI = require('./routes/genres.js');
const customersAPI = require('./routes/customers.js');
const moviesAPI = require('./routes/movies.js');
const rentalsAPI = require('./routes/rentals.js');
const usersAPI = require('./routes/users.js');
const authAPI = require('./routes/auth.js');

// middlewares
app.use(express.json());

// export handling of routes to their respective routers
app.use('/api/genres', genresAPI);
app.use('/api/customers', customersAPI);
app.use('/api/movies', moviesAPI);
app.use('/api/rentals', rentalsAPI);
app.use('/api/users', usersAPI);
app.use('/api/login', authAPI);
// register the error middleware
app.use(errorMiddleware);

// Listen

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on Port: ${PORT}`);
});
