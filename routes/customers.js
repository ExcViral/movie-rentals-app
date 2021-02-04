const mongoose = require('mongoose');
const debug = require('debug')('app:customers');
const express = require('express');
const { Customer, validate } = require('../models/customers.js');
const auth = require('../middlewares/auth.js');
const adminAuth = require('../middlewares/admin.js');
const router = express.Router();

// check database status, give it one second so that db gets connected
setTimeout(() => {
	const state = mongoose.connection.readyState;
	if (state == 0) debug('Database is disconnected');
	else if (state == 1) debug('Database is connected');
	else if (state == 2) debug('Database is connecting');
	else if (state == 3) debug('Database is disconnecting');
}, 1000);

// ///////////////////////////////////////////////////////////
// ROUTE HANDLERS: /api/genres/customers
// ///////////////////////////////////////////////////////////

// CREATE

// create a new customer
router.post('/', auth, async (req, res, next) => {
	debug('POST /api/genres/customers');
	try {
		// validate the input from the client using joi
		const { value, error } = validate(req.body);
		// if invalid input reveived, send 400 bad request
		if (error) return res.status(400).send(error.details[0].message);
		// otherwise create a new customer object and send it to client
		let customer = new Customer(value);
		customer = await customer.save();
		res.send(customer);
	} catch (ex) {
		next(ex);
	}
});

// READ

// handle request for all customers
router.get('/', auth, async (req, res, next) => {
	debug('GET /api/genres/customers');
	try {
		const customers = await Customer.find({}).sort('name');
		res.send(customers);
	} catch (ex) {
		next(ex);
	}
});

// handle request for a single customer
router.get('/:id', auth, async (req, res, next) => {
	debug(`GET /api/genres/customers/${req.params.id}`);
	try {
		const customer = await Customer.findById(req.params.id);
		// if customer not found return 404 not found
		if (!customer)
			return res
				.status(404)
				.send(
					'Sorry, we are unable to find the requested customer in our records ...'
				);
		// otherwise return customer document to the client
		res.send(customer);
	} catch (ex) {
		next(ex);
	}
});

// UPDATE

// handle request for updating a customer
router.put('/:id', auth, async (req, res, next) => {
	debug(`PUT /api/genres/customers/${req.params.id}`);
	try {
		// validate the input from the client using joi
		const { value, error } = validate(req.body);
		// if invalid input reveived, send 400 bad request
		if (error) return res.status(400).send(error.details[0].message);
		// try to update the customer [UPDATEFIRST]
		const customer = await Customer.findByIdAndUpdate(req.params.id, value, {
			new: true,
		});
		// if customer not found return immediately
		if (!customer)
			return res
				.status(404)
				.send(
					'Sorry, we are unable to find the requested customer in our records ...'
				);
		// else send the customer document to the client
		res.send(customer);
	} catch (ex) {
		next(ex);
	}
});

// DELETE

// handle request to delete a customer
router.delete('/:id', auth, adminAuth, async (req, res, next) => {
	debug(`DELETE /api/genres/customers/${req.params.id}`);
	try {
		const customer = await Customer.findByIdAndRemove(req.params.id);
		// if customer doesnot exist
		if (!customer)
			return res
				.status(404)
				.send(
					'Sorry, we are unable to find the requested customer in our records ...'
				);
		// otherwise return deleted customer to the client
		res.send(customer);
	} catch (ex) {
		next(ex);
	}
});

// export the router object
module.exports = router;
