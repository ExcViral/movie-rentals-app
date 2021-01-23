const Joi = require('joi')
const mongoose = require('mongoose')

// create schema for genres
const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		trim: true,
		set: function(s) {
			let words = s.split(" ")
			for (let i = 0; i < words.length; i++) {
			    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
			}
			return words.join(" ")
		}
	}
})

// compile it into model
const Genre = mongoose.model("Genre", genreSchema)


// ///////////////////////////////////////////////////////////
// HELPER FUNCTIONS
// ///////////////////////////////////////////////////////////

// Function to Validate a Genre Name
// input: Object with key - name and value -string
// output: object with keys value and error
function validateGenreName(name) {
	
	const schema = Joi.object({
		name: Joi.string()
			.min(3)
			.required()
	})

	return schema.validate(name)
}


module.exports = {
	Genre: Genre,
	validate: validateGenreName,
	genreSchema: genreSchema
}