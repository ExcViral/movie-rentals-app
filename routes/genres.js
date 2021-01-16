const Joi = require('joi')
const express = require('express')
const router = express.Router()

// Genres Array
// TODO: Implement Database
Genres = [
	{Gid: 1, name: "Action"},
	{Gid: 2, name: "Adventure"},
	{Gid: 3, name: "Comedy"},
	{Gid: 4, name: "Crime"},
	{Gid: 5, name: "Drama"}
]

// EndPoint for getting the list of all Genres
router.get("/", (req, res) => {
	res.send(Genres)
})

// EndPoint for getting a single Genre
router.get("/:id", (req, res) => {
	// check whether the requested id exists
	const genre = Genres.find(i => i.Gid === parseInt(req.params.id))
	// if requested id doesnot exist, return 404 not found
	if (!genre) return res.status(404).send("Requested Genre Doesnot Exist")

	// otherwise return the requested genre
	res.send(genre)
})

// EndPoint for creating a new Genre
router.post("/", (req, res) => {
	// Generate id for the genre
	const id = Genres[Genres.length-1].Gid + 1
	// validate the new Genre Name
	const {value, error} = validateGenreName(req.body)
	// Return 400 for invalid input
	if(error) return res.status(400).send(error.details[0].message)
	// otherwise create a new genre and add it
	const newGenre = {
		Gid: id,
		name: value.name
	}
	Genres.push(newGenre)
	// By Convention, return the newly added Genre to the client
	res.send(newGenre)
})

// EndPoint for updating existing Genres
router.put("/:id", (req, res) => {
	// check whether the requested id exists
	const genre = Genres.find(i => i.Gid === parseInt(req.params.id))
	// if requested id doesnot exist, return 404 not found
	if (!genre) return res.status(404).send("Requested Genre Doesnot Exist")
	
	// validate the requested update name
	const {value, error} = validateGenreName(req.body)
	// if invalid input, return 400 bad request
	if(error) return res.status(400).send(error.details[0].message)

	// otherwise update the Genre
	genre.name = value.name

	// by convention, send the updated genre to the client
	res.send(genre)
})

// EndPoint for deleting existing Genres
router.delete("/:id", (req, res) => {
	// check whether the requested id exists
	const genre = Genres.find(i => i.Gid === parseInt(req.params.id))
	// if requested id doesnot exist, return 404 not found
	if (!genre) return res.status(404).send("Requested Genre Doesnot Exist")

	// otherwise delete the Genre
	const index = Genres.indexOf(genre)
	Genres.splice(index, 1)
	// By convention return the deleted Genre to the client 
	res.send(genre)
})

// export the router object
module.exports = router


// Functions

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