const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minlength: 3,
		maxlength: 255,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		minlength: 3,
		maxlength: 255,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 3,
	},
	isAdmin: {
		type: Boolean,
		default: false,
		required: true,
	},
});

// add a custom method to generate JSON WEB TOKEN (JWT)
userSchema.methods.genJWT = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			isAdmin: this.isAdmin,
		},
		config.get('jwt.pkey')
	);
	return token;
};

const User = mongoose.model('User', userSchema);

// ///////////////////////////////////////////////////////////
// HELPER FUNCTIONS
// ///////////////////////////////////////////////////////////

// Function to Validate a User Registration Details
// input: Object with keys 'username', 'email' and 'password'
// output: object with keys 'value' and 'error'

function validateUser(user_obj) {
	const schema = Joi.object({
		username: Joi.string().required().min(3).max(255),
		email: Joi.string().email().required(),
		password: Joi.string().required().min(3).max(255),
	});
	return schema.validate(user_obj);
}

// export the User class and validateUser function
module.exports = {
	User: User,
	validate: validateUser,
};
