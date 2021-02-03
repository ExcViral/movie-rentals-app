const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const debug = require('debug')('app:auth');
const { User } = require('../models/users.js');
const Joi = require('joi');

// check database status, give it one second so that db gets connected
setTimeout(() => {
	const state = mongoose.connection.readyState;
	if (state == 0) debug('Database is disconnected');
	else if (state == 1) debug('Database is connected');
	else if (state == 2) debug('Database is connecting');
	else if (state == 3) debug('Database is disconnecting');
}, 1000);

// ///////////////////////////////////////////////////////////
// ROUTE HANDLERS: /api/login
// ///////////////////////////////////////////////////////////

// handle login request
router.post('/', async (req, res) => {
	debug('POST /api/login');
	try {
		// Joi validate username and password
		const {
			value: { username, password },
			error,
		} = validate(req.body);
		// if error terminate request and send 400 bad request
		if (error) return res.status(400).send(error.details[0].message);
		// otherwise lookup user in database
		const user = await User.findOne({ username: username });
		// if user does't exist terminate request with 400 bad request, and send send vague message saying username or password invalid
		if (!user) return res.status(400).send('Invalid Username or Password');
		// otherwise compare password
		const validPassword = await bcrypt.compare(password, user.password);
		// if invalid password, terminate request with 400 bad request, and send send vague message saying username or password invalid
		if (!validPassword)
			return res.status(400).send('Invalid Username or Password');
		// otherwise
		// create a new json webtoken and send to client as a header
		// const token = jwt.sign({ _id: user._id}, config.get('jwt.pkey'))
		const token = user.genJWT();
		res.header('x-auth-token', token).send('login successful');
	} catch (ex) {
		console.log(ex);
		// send 500 internal server error
		res.status(500).send('Sorry, we could not process your request');
	}
});

// export the router
module.exports = router;

// ///////////////////////////////////////////////////////////
// HELPER FUNCTIONS
// ///////////////////////////////////////////////////////////

// Function to Validate a User login details
// input: Object with keys 'username' and 'password'
// output: object with keys 'value' and 'error'

function validate(user) {
	const schema = Joi.object({
		username: Joi.string().required().min(3).max(255),
		password: Joi.string().required().min(3).max(255),
	});
	return schema.validate(user);
}
