const Joi = require('joi')
const express = require('express')
const router = express.Router()
const debug = require('debug')('app:genres')
const mongoose = require('mongoose')
const {Genre, validate} = require("../models/genres.js")
const auth = require('../middlewares/auth.js')
const adminAuth = require('../middlewares/admin.js')

// check database status, give it one second so that db gets connected
setTimeout(() => {
	const state = mongoose.connection.readyState
	if(state == 0) debug("Database is disconnected")
	else if(state == 1) debug("Database is connected")
	else if(state == 2) debug("Database is connecting")
	else if(state == 3) debug("Database is disconnecting")
}, 1000)


// ///////////////////////////////////////////////////////////
// ROUTE HANDLERS: /api/genres
// ///////////////////////////////////////////////////////////

// // EndPoint for getting the list of all Genres
router.get("/", async (req, res) => {
	debug("GET /api/genres")
	try {
		const genres = await Genre.find({})
		res.send(genres)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error
		res.status(500).send("Sorry, we could not process your request!")
	}
})

// EndPoint for getting a single Genre
router.get("/:id", async (req, res) => {
	debug(`GET /api/genres/${req.params.id}`)
	try {
		const genre = await Genre.findById(req.params.id)
		// return immediately if id doesnot exist
		if (!genre) return res.status(404).send("Requested Genre Doesnot Exist")
		// otherwise return genre to the client 
		res.send(genre)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error
		res.status(500).send("Sorry, we could not process your request")	
	}
	// getGenreByID(req.params.id, res)
})

// EndPoint for creating a new Genre
router.post("/", auth, async (req, res) => {
	debug("POST /api/genres")
	// validate the new Genre Name
	const {value, error} = validate(req.body)
	// Return 400 for invalid input
	if(error) return res.status(400).send(error.details[0].message)
	// otherwise create a genre
	try{
		let genre = new Genre({
			name: value.name
		})
		genre = await genre.save()
		res.send(genre)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error
		res.status(500).send("Sorry, we could not process your request")
	}
})

// EndPoint for updating existing Genres
router.put("/:id", auth, async (req, res) => {
	debug(`PUT /api/genres/${req.params.id}`)
	try {
		let genre = await Genre.findById(req.params.id)
		// return immediately if the input id does not exist
		if (!genre) return res.status(404).send("Requested Genre Doesnot Exist")
		// validate the requested update name
		const {value, error} = validate(req.body)
		// if invalid input, return 400 bad request
		if(error) return res.status(400).send(error.details[0].message)
		// otherwise update the genre and return updated genre to client
		genre.set({
			name: value.name
		})
		genre = await genre.save()
		res.send(genre)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error
		res.status(500).send("Sorry, we could not process your request")		
	}
})

// EndPoint for deleting existing Genres
router.delete("/:id", [auth, adminAuth], async (req, res) => {
	debug(`DELETE /api/genres/${req.params.id}`)
	try{
		const genre = await Genre.findByIdAndRemove(req.params.id)
		// if genre doesnot exist
		if (!genre) return res.status(404).send("Requested Genre Doesnot Exist")
		// otherwise return deleted genre to the client
		res.send(genre)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error
		res.status(500).send("Sorry, we could not process your request")
	}
})

// export the router object
module.exports = router