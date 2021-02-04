const error = (err, req, res, next) => {
	// TODO: Implement logic to log errors
	console.log(err);
	// send a 500 internal server error with friendly message
	res
		.status(500)
		.send(
			'Oh no! Something bad happened.' +
				' Please come back later when we fixed that problem. Thanks.'
		);
	next();
};

module.exports = error;
