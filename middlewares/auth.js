const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
	// first extract the `x-auth-token`
	const token = req.header('x-auth-token');
	// if there is no token, return 401 Access Denied
	if (!token) return res.status(401).send('Access Denied. No token provided');
	// otherwise validate the token
	try {
		// jwt.verify() returns a decoded payload
		// jwt.verify() throws an exception for invalid token so try-catch
		const payload = jwt.verify(token, config.get('jwt.pkey'));
		// we add this decoded payload to a property in request object
		// let's call this property user
		req.user = payload;
		// And then pass on the control to the next middleware
		next();
	} catch (ex) {
		console.log(ex);
		// if we get exception, client has sent invalid token, i.e. bad request
		res.status(400).send('Invalid Token');
	}
}

module.exports = auth;
