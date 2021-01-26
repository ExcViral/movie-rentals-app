const express = require('express')
const app = express()
const debug = require('debug')("app:main")
const config = require('config')
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// connect to db
const connStr = config.get("db.connStr")
debug(`connection string: ${connStr}`)

mongoose.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => { debug("Connected to the database") })
	.catch((err) => { console.log("Could not connect to mongoDB", err)} )

// router imports
const genresAPI = require("./routes/genres.js")
const customersAPI = require("./routes/customers.js")
const moviesAPI = require("./routes/movies.js")
const rentalAPI = require("./routes/rentals.js")

app.use(express.json())

// import the generes router module 
app.use("/api/genres", genresAPI)
app.use("/api/customers", customersAPI)
app.use("/api/movies", moviesAPI)
app.use("/api/rentals", rentalAPI)


// Listen

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Listening on Port: ${PORT}`)
})