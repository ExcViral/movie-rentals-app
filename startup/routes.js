const express = require('express');
// middleware imports
const errorMiddleware = require('../middlewares/error.js');
const corsSetup = require('../middlewares/cors.js');
// router imports
const genresAPI = require('../routes/genres.js');
const customersAPI = require('../routes/customers.js');
const moviesAPI = require('../routes/movies.js');
const rentalsAPI = require('../routes/rentals.js');
const usersAPI = require('../routes/users.js');
const authAPI = require('../routes/auth.js');

module.exports = app => {
	// middlewares
	app.use(express.json());
	// https://enable-cors.org/server_expressjs.html
	app.use(corsSetup);
	// export handling of routes to their respective routers
	app.use('/api/genres', genresAPI);
	app.use('/api/customers', customersAPI);
	app.use('/api/movies', moviesAPI);
	app.use('/api/rentals', rentalsAPI);
	app.use('/api/users', usersAPI);
	app.use('/api/login', authAPI);
	// register the error middleware
	app.use(errorMiddleware);
};
