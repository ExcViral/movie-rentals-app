const config = require('config');

module.exports = () => {
	// check if all environment variables are set

	// private key for json web token
	if (!config.has('jwt.pkey')) {
		throw new Error('FATAL ERROR: vidly_jwtpkey is not defined');
	}
};
