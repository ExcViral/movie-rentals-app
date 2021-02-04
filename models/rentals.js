const mongoose = require('mongoose');
const Joi = require('joi');

// define schema for rentals documents
const rentalsSchema = new mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
			name: { type: String, required: true },
			phoneNumber: { type: String, required: true },
			isGold: { type: Boolean, required: true },
		}),
		required: true,
	},
	movie: {
		type: new mongoose.Schema({
			title: { type: String, required: true },
			dailyRentalRate: { type: Number, required: true },
		}),
		required: true,
	},
	dateOut: {
		type: Date,
		default: Date.now,
		required: true,
	},
	dateReturned: Date,
	rentalFee: {
		type: Number,
		required: true,
		min: 0,
		default: 5,
	},
});

const Rental = mongoose.model('Rental', rentalsSchema);

// ///////////////////////////////////////////////////////////
// HELPER FUNCTIONS
// ///////////////////////////////////////////////////////////

// Function to Validate a rental request received from the client
// client should send two objectIds, for a movie and a customer

function validateRental(rentalObj) {
	const schema = Joi.object({
		customerId: Joi.objectId(),
		movieId: Joi.objectId(),
	});
	return schema.validate(rentalObj);
}

module.exports = {
	Rental: Rental,
	validate: validateRental,
	rentalsSchema: rentalsSchema,
};
