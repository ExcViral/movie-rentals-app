const express = require('express')
const app = express()

// router imports
const genresAPI = require("./routes/genres.js")

app.use(express.json())

// import the generes router module 
app.use("/api/genres", genresAPI)


// Listen

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Listening on Port: ${PORT}`)
})