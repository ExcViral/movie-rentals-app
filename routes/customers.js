const mongoose = require("mongoose")
const debug = require("debug")("app:customers")
const Joi = require("joi")
const express = require("express")

const router = express.Router()

// check database status, give it one second so that db gets connected
setTimeout(() => {
	const state = mongoose.connection.readyState
	if(state == 0) debug("Database is disconnected")
	else if(state == 1) debug("Database is connected")
	else if(state == 2) debug("Database is connecting")
	else if(state == 3) debug("Database is disconnecting")
}, 1000)

// create schema for customer document
const customerSchema = new mongoose.Schema({
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
	},
	phoneNumber: {
		type: String,
		required: true,
		trim: true,
		match: /([0-9]{10})/
	},
	isGold: {
		type: Boolean,
		default: false
		// required: true
	}
})

const Customer = mongoose.model("Customer", customerSchema)


// ///////////////////////////////////////////////////////////
// ROUTE HANDLERS: /api/genres/customers
// ///////////////////////////////////////////////////////////

// CREATE

// create a new customer
router.post("/", async (req, res) => {
	debug("POST /api/genres/customers")
	try {
		// validate the input from the client using joi
		const {value, error} = validateCustomer(req.body)
		// if invalid input reveived, send 400 bad request
		if (error) return res.status(400).send(error.details[0].message)
		// otherwise create a new customer object and send it to client
		let customer = new Customer(value)
		customer = await customer.save()
		res.send(customer)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error to client
		res.status(500).send("Sorry, we are unable to process your request at the moment. We regret the inconvenience caused, Please retry later ... ")
	}
})

// READ

// handle request for all customers
router.get("/", async (req, res) => {
	debug("GET /api/genres/customers")
	try {
		const customers = await Customer.find({}).sort("name")
		res.send(customers)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error to client
		res.status(500).send("Sorry, we are unable to process your request at the moment. We regret the inconvenience caused, Please retry later ... ")
	}
})

// handle request for a single customer
router.get("/:id", async (req, res) => {
	debug(`GET /api/genres/customers/${req.params.id}`)
	try {
		const customer = await Customer.findById(req.params.id)
		// if customer not found return 404 not found
		if (!customer) return res.status(404).send("Sorry, we are unable to find the requested customer in our records ...")
		// otherwise return customer document to the client
		res.send(customer)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error to client
		res.status(500).send("Sorry, we are unable to process your request at the moment. We regret the inconvenience caused, Please retry later ... ")
	}
})

// UPDATE

// handle request for updating a customer
router.put("/:id", async (req, res) => {
	debug(`PUT /api/genres/customers/${req.params.id}`)
	try {
		// validate the input from the client using joi
		const {value, error} = validateCustomer(req.body)
		// if invalid input reveived, send 400 bad request
		if (error) return res.status(400).send(error.details[0].message)
		// try to update the customer [UPDATEFIRST]
		const customer = await Customer.findByIdAndUpdate(req.params.id, value, {new: true})
		// if customer not found return immediately
		if (!customer) return res.status(404).send("Sorry, we are unable to find the requested customer in our records ...")
		// else send the customer document to the client
		res.send(customer)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error to client
		res.status(500).send("Sorry, we are unable to process your request at the moment. We regret the inconvenience caused, Please retry later ... ")
	}
})

// DELETE

// handle request to delete a customer
router.delete("/:id", async (req, res) => {
	debug(`DELETE /api/genres/customers/${req.params.id}`)
	try {
		const customer = await Customer.findByIdAndRemove(req.params.id)
		// if customer doesnot exist
		if (!customer) return res.status(404).send("Sorry, we are unable to find the requested customer in our records ...")
		// otherwise return deleted customer to the client
		res.send(customer)
	}
	catch(ex) {
		console.log(ex)
		// send 500 internal server error to client
		res.status(500).send("Sorry, we are unable to process your request at the moment. We regret the inconvenience caused, Please retry later ... ")
	}
})

// export the router object
module.exports = router


// ///////////////////////////////////////////////////////////
// HELPER FUNCTIONS
// ///////////////////////////////////////////////////////////

// Function to Validate a Genre Name
// input: Object with keys 'name', 'phoneNumber' and 'isGold'
// output: object with keys 'value' and 'error'
function validateCustomer(customer_obj) {
	const schema = Joi.object({
		name: Joi.string()
			.required()
			.min(3),
		phoneNumber: Joi.string()
			.required()
			.pattern(new RegExp('([0-9]{10})')),
		isGold: Joi.boolean()
	})
	return schema.validate(customer_obj)
}