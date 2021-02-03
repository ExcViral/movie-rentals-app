const mongoose = require('mongoose')
const debug = require('debug')('app:movies')
const express = require('express')
const router = express.Router()
const { Movie, validate } = require('../models/movies.js')
const { Genre } = require('../models/genres.js')
const auth = require('../middlewares/auth.js')

// check database status, give it one second so that db gets connected
setTimeout(() => {
	const state = mongoose.connection.readyState
	if(state == 0) debug("Database is disconnected")
	else if(state == 1) debug("Database is connected")
	else if(state == 2) debug("Database is connecting")
	else if(state == 3) debug("Database is disconnecting")
}, 1000)

// ///////////////////////////////////////////////////////////
// ROUTE HANDLERS: /api/movies
// ///////////////////////////////////////////////////////////

// CREATE

// handle request to create a movie object
router.post("/", auth, async (req, res) => {
	debug("POST /api/movies")
	try {
		// req.body should contain a json object with minimum [ title and id of genre ]

		// first Joi validate the req.body sent by client
		const { value, error } = validate(req.body)
		// if error, send it to client
		if (error) return res.status(400).send(error.details[0].message)
		// if req.body is valid then try to fetch the genre from db using genreId
		const genre = await Genre.findById(value.genreId)
		// if invalid id or id not exist, return 400 bad request
		if (!genre) return res.status(400).send("Invalid Genre, The selected genre does not exist in database ...")
		// Then create a new movie object
		let movie = new Movie({
			title: value.title,
			// we will not equate to genre received from db directly,
			// as we can have a lot of properties we donot want
			genre: {
				_id: genre._id,
				name: genre.name
			},
			numberInStock: value.numberInStock,
			dailyRentalRate: value.dailyRentalRate
		})
		// save the movie to db
		movie = await movie.save()
		// finally return the movie document to the client
		res.send(movie)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error
		res.status(500).send("Sorry, we are unable to process your request at the moment. We regret the inconvenience caused, Please retry later ... ")	
	}
})

// READ

// get all movies
router.get("/", async (req, res) => {
	debug("GET /api/movies")
	try {
		// get all the movies
		const movies = await Movie.find({})
		// send the movies
		res.send(movies)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error
		res.status(500).send("Sorry, we are unable to process your request at the moment. We regret the inconvenience caused, Please retry later ... ")	
	}
})

// // get all movies with pagination
// // supports route: /api/movies?page=1&size=10
// router.get("/", async (req, res) => {
// 	debug("GET /api/movies")
// 	try {
// 		let { page, size } = req.query
// 		page = parseInt(page)
// 		size = parseInt(size)
// 		debug(page, size)
// 		const movies = await Movie
// 						.find()
// 						.skip((page - 1)*size)
// 						.limit(size)
// 		res.send(movies)
// 	}
// 	catch(ex) {
// 		console.log(ex)
// 		// send 500 internal server error
// 		res.status(500).send("Sorry, we are unable to process your request at the moment. We regret the inconvenience caused, Please retry later ... ")	
// 	}
// })

// get movie by id
router.get("/:id", async (req, res) => {
	debug(`GET /api/movies/${req.params.id}`)
	try {
		// try to find movie
		const movie = await Movie.findById(req.params.id)
		// if movie not found, return 404 not found
		if (!movie) return res.status(404).send("Sorry, we are unable to find the movie you have requested!")
		// otherwise send the movie to the client
		res.send(movie)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error
		res.status(500).send("Sorry, we are unable to process your request at the moment. We regret the inconvenience caused, Please retry later ... ")	
	}
})


// UPDATE

// update numberInStock
router.put("/:id", auth, async (req, res) => {
	debug(`PUT /api/movies/${req.params.id}`)
	try {
		// first validate the req.body
		const { value, error } = validate(req.body)
		// if there is error, return 400 bad request
		if (error) return res.status(400).send(error.details[0].message)
		// try to get the genre
		const genre = await Genre.findById(req.body.genreId)
		// if not found, return 404 not found
		if (!genre) return res.status(404).send("Invalid Genre, The selected genre does not exist in database ...")
		// try to update
		const movie = await Movie.findByIdAndUpdate(req.params.id, {
			title: value.title,
			genre: {
				_id: genre._id,
				name: genre.name
			},
			numberInStock: value.numberInStock,
			dailyRentalRate: value.dailyRentalRate
		}, { new: true })
		// send the updated movie to the client
		res.send(movie)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error
		res.status(500).send("Sorry, we are unable to process your request at the moment. We regret the inconvenience caused, Please retry later ... ")	
	}
})

// DELETE 
router.delete("/:id", auth, async (req, res) => {
	debug(`DELETE /api/movies/${req.params.id}`)
	try {
		// find the movie by id and delete it
		const movie = await Movie.findByIdAndRemove(req.params.id)
		// if no movie was found, return 404 not found error
		if (!movie) return res.status(404).send("Sorry, we are unable to find the movie you have requested to delete!")
		// By convention, send the deleted movie to the client for reference
		res.send(movie)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error
		res.status(500).send("Sorry, we are unable to process your request at the moment. We regret the inconvenience caused, Please retry later ... ")	
	}	
})

module.exports = router