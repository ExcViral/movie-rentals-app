// This Middleware Is To Be Executed After `auth.js`

module.exports = function (req, res, next) {
	// The `auth.js` has to set req.user property for this to work
	// If non Admin user tries to access a resource,
	// we send a 403 Forbidden error: Access Denied
	if (!req.user.isAdmin) return res.status(403).send('Access Denied');
	next();
};
