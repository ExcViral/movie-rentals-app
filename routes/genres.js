const Joi = require('joi');
const express = require('express');
const router = express.Router();
const debug = require('debug')('app:genres');
const mongoose = require('mongoose');
const { Genre, validate } = require('../models/genres.js');

// middleware imports
const auth = require('../middlewares/auth.js');
const adminAuth = require('../middlewares/admin.js');
const asyncMiddleware = require('../middlewares/async.js');

// check database status, give it one second so that db gets connected
setTimeout(() => {
	const state = mongoose.connection.readyState;
	if (state == 0) debug('Database is disconnected');
	else if (state == 1) debug('Database is connected');
	else if (state == 2) debug('Database is connecting');
	else if (state == 3) debug('Database is disconnecting');
}, 1000);

// ///////////////////////////////////////////////////////////
// ROUTE HANDLERS: /api/genres
// ///////////////////////////////////////////////////////////

// // EndPoint for getting the list of all Genres
router.get(
	'/',
	asyncMiddleware(async (req, res) => {
		debug('GET /api/genres');
		const genres = await Genre.find({});
		res.send(genres);
	})
);

// EndPoint for getting a single Genre
router.get(
	'/:id',
	asyncMiddleware(async (req, res) => {
		debug(`GET /api/genres/${req.params.id}`);
		const genre = await Genre.findById(req.params.id);
		// return immediately if id doesnot exist
		if (!genre) return res.status(404).send('Requested Genre Doesnot Exist');
		// otherwise return genre to the client
		res.send(genre);
	})
);

// EndPoint for creating a new Genre
router.post(
	'/',
	auth,
	asyncMiddleware(async (req, res) => {
		debug('POST /api/genres');
		// validate the new Genre Name
		const { value, error } = validate(req.body);
		// Return 400 for invalid input
		if (error) return res.status(400).send(error.details[0].message);
		// otherwise create a genre
		let genre = new Genre({
			name: value.name,
		});
		genre = await genre.save();
		res.send(genre);
	})
);

// EndPoint for updating existing Genres
router.put(
	'/:id',
	auth,
	asyncMiddleware(async (req, res) => {
		debug(`PUT /api/genres/${req.params.id}`);
		let genre = await Genre.findById(req.params.id);
		// return immediately if the input id does not exist
		if (!genre) return res.status(404).send('Requested Genre Doesnot Exist');
		// validate the requested update name
		const { value, error } = validate(req.body);
		// if invalid input, return 400 bad request
		if (error) return res.status(400).send(error.details[0].message);
		// otherwise update the genre and return updated genre to client
		genre.set({
			name: value.name,
		});
		genre = await genre.save();
		res.send(genre);
	})
);

// EndPoint for deleting existing Genres
router.delete(
	'/:id',
	[auth, adminAuth],
	asyncMiddleware(async (req, res) => {
		debug(`DELETE /api/genres/${req.params.id}`);
		const genre = await Genre.findByIdAndRemove(req.params.id);
		// if genre doesnot exist
		if (!genre) return res.status(404).send('Requested Genre Doesnot Exist');
		// otherwise return deleted genre to the client
		res.send(genre);
	})
);

// export the router object
module.exports = router;
