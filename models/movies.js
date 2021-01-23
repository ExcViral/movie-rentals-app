const mongoose = require('mongoose')
const Joi = require('joi')
const { genreSchema } = require("./genres.js")

const movieSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 255, // we don't want any malacious client to send too big string to break our app
		set: function(s) {
			let words = s.split(" ")
			for (let i = 0; i < words.length; i++) {
			    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
			}
			return words.join(" ")
		}
	},
	genre: {
		type: genreSchema,
		required: true
	},
	numberInStock: {
		type: Number,
		required: true,
		default: 0,
		// again we don't want negative number here, as well as we don't want too big number
		min: 0,
		max: 255
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		default: 0,
		// again we don't want negative number here, as well as we don't want too big number
		min: 0,
		max: 255
	}
})

const Movie = mongoose.model('Movie', movieSchema)


// ///////////////////////////////////////////////////////////
// HELPER FUNCTIONS
// ///////////////////////////////////////////////////////////

// Function to Validate a Movie object
// TODO: validate the genre array part
// Note, we will ask genreId from client, 
// so, as first line of defence, we will check if genreId exists, and it is a string 
// JOI SCHEMA CAN BE DIFFENT FROM MONGOOSE SCHEMA
function validateMovie(movie) {
	
	const schema = Joi.object({
		title: Joi.string()
			.min(3)
			.max(255)
			.required(),
		genreId: Joi.string()
			.length(24) // objectId has 24 characters
			.required(),
		numberInStock: Joi.number().default(0),
		dailyRentalRate: Joi.number().default(0)
	})

	return schema.validate(movie)
}


module.exports = {
	Movie: Movie,
	validate: validateMovie,
	movieSchema: movieSchema
}
