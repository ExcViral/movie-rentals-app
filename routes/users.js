const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const debug = require('debug')('app:users-registration');
const { User, validate } = require('../models/users.js');
const _ = require('lodash');
const bcrypt = require('bcrypt');

// middleware imports
const auth = require('../middlewares/auth.js');
const adminAuth = require('../middlewares/admin.js');
const asyncMiddleware = require('../middlewares/async.js');

// check database status, give it one second so that db gets connected
setTimeout(() => {
	const state = mongoose.connection.readyState;
	if (state == 0) debug('Database is disconnected');
	else if (state == 1) debug('Database is connected');
	else if (state == 2) debug('Database is connecting');
	else if (state == 3) debug('Database is disconnecting');
}, 1000);

// ///////////////////////////////////////////////////////////
// ROUTE HANDLERS: /api/users
// ///////////////////////////////////////////////////////////

// CREATE

// handle request to register user
router.post(
	'/',
	asyncMiddleware(async (req, res) => {
		debug('POST /api/users');
		// validate the input received from client
		const { value, error } = validate(req.body);
		// if there is an error, send it to client
		if (error) return res.status(400).send(error.details[0].message);

		// now check if the username or email already exists in our db
		// const check = await User.findOne({ $or: [{ username: username },{ email: email }] })
		// if already exist, return immediately
		// if (check) return res.status(400).send("The username or email already exists")

		// check if username already exists then check for email
		if (await User.findOne({ username: value.username }))
			return res.status(400).send('Username taken');
		if (await User.findOne({ email: value.email }))
			return res.status(400).send('Email taken');

		// now we hash the password
		// generate salt
		const salt = await bcrypt.genSalt(10);
		// generate hash
		value.password = await bcrypt.hash(value.password, salt);

		// otherwise try to create a new user
		const user = new User(_.pick(value, ['username', 'email', 'password']));
		// try to save the user in db
		await user.save();

		// generate a jwt for client
		const token = user.genJWT();
		// by convention send the registration details to the client.
		// In this case we will send the jwt to the client directly
		// Note: Never send the password back to the client for security reasons.
		// we will use `lodash` to pick what values to send
		res
			.header('x-auth-token', token)
			.send(_.pick(user, ['_id', 'username', 'email']));
	})
);

// READ

// handle request to get user's personal profile
router.get(
	'/me',
	auth,
	asyncMiddleware(async (req, res) => {
		debug(`GET /api/users/${req.user._id}`);
		// try to get the id from the db but exclude database field
		const user = await User.findById(req.user._id).select('-password');
		// if user not found return 404 not found
		if (!user)
			return res.status(404).send('We cannot find the requested user.');
		// otherwise return the user data to the client
		res.send(user);
	})
);

// [ADMIN ONLY] handle request to get all users' profiles
router.get(
	'/all',
	[auth, adminAuth],
	asyncMiddleware(async (req, res) => {
		debug(`GET /api/users/all`);
		// try to get the id from the db but exclude database field
		const users = await User.find({}).select('-password');
		res.send(users);
	})
);

// export the router object
module.exports = router;
