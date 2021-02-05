const mongoose = require('mongoose');
const debug = require('debug')('app:rentals');
const express = require('express');
const router = express.Router();

const { Rental, validate } = require('../models/rentals.js');
const { Customer } = require('../models/customers.js');
const { Movie } = require('../models/movies.js');

// middleware imports
const asyncMiddleware = require('../middlewares/async.js');
const auth = require('../middlewares/auth.js');

const Fawn = require('fawn');
Fawn.init(mongoose);

// check database status, give it one second so that db gets connected
setTimeout(() => {
	const state = mongoose.connection.readyState;
	if (state == 0) debug('Database is disconnected');
	else if (state == 1) debug('Database is connected');
	else if (state == 2) debug('Database is connecting');
	else if (state == 3) debug('Database is disconnecting');
}, 1000);

// ///////////////////////////////////////////////////////////
// ROUTE HANDLERS: /api/rentals
// ///////////////////////////////////////////////////////////

// CREATE

// Endpoint to create a rental document
router.post(
	'/',
	auth,
	asyncMiddleware(async (req, res) => {
		debug('POST /api/rentals');
		// first Joi validate the object received from the client
		const { value, error } = validate(req.body);
		// if invalid object received, terminate request immediately
		if (error) return res.status(400).send(error.details[0].message);
		// otherwise try to get the customer from the database
		const customer = await Customer.findById(value.customerId);
		// if customer not found, return 404 not found error
		if (!customer)
			return res
				.status(404)
				.send(
					'Sorry, we are unable to find the requested customer in our records ...'
				);
		// otherwise try to get the movie from the database
		const movie = await Movie.findById(value.movieId);
		// if movie not found, return 404 not found error
		if (!movie)
			return res
				.status(404)
				.send('Sorry, we are unable to find the movie you have requested!');
		// if movie not in stock, return with 400 bad request
		if (movie.numberInStock === 0)
			return res.status(400).send('Sorry, the selected movie is out of stock');
		// otherwise create a new rental document
		const rental = new Rental({
			customer: {
				_id: customer._id,
				name: customer.name,
				phoneNumber: customer.phoneNumber,
				isGold: customer.isGold,
			},
			movie: {
				_id: movie._id,
				title: movie.title,
				dailyRentalRate: movie.dailyRentalRate,
			},
			// TODO: Implement Rental-Fee Logic here
			// currently rental fee will be set as Rs. 5 by default
		});
		// TODO: IMPLEMENT TRANSACTION HERE

		// Original:
		// // first save the rental document to db
		// await rental.save()
		// // then decrement the numberInStock of movie and save it
		// movie.numberInStock--
		// await movie.save()
		// // By convention, send the rental document back to the client
		// res.send(rental)

		// nakli fawn transaction
		// this works but is BUGGY
		// try to use original transactions
		new Fawn.Task()
			.save('rentals', rental)
			.update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
			.run();

		res.send(rental);
	})
);

// READ

// Endpoint to get all rental documents
router.get(
	'/',
	auth,
	asyncMiddleware(async (req, res) => {
		debug('GET /api/rentals');
		// query the db
		const rentals = await Rental.find({}).sort('-dateOut');
		// send the result
		res.send(rentals);
	})
);

// export the router object
module.exports = router;
