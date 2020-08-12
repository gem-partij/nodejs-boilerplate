const createError = require("http-errors");

const checkPermission = (allowed) => {
	const isAllowed = (permissions) => {
		let is_allowed = false;

		for (let i = 0; i < permissions.length; i++) {
			const check = permissions[i];
			if (allowed.indexOf(check) > -1) {
				is_allowed = true;
				break;
			}
		}

		return is_allowed;
	};

	// return a middleware
	return (req, res, next) => {
		if (req.auth_user && isAllowed(req.auth_user.permissions)) {
			next();
		} else {
			next(createError(403, "Forbidden"));
		}
	};
};

module.exports = checkPermission;
