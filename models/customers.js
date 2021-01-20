const mongoose = require("mongoose")
const Joi = require("joi")

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

// export the Customer class and validateCustomer function
module.exports = {
	Customer: Customer,
	validate: validateCustomer
}

// module.exports.Customer = Customer
// module.exports.validate = validateCustomer