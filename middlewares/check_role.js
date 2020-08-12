const createError = require("http-errors");

const checkRole = (allowed) => {
	const isAllowed = (roles) => {
		// console.log("allowed", allowed);
		// console.log("roles", roles);

		let is_allowed = false;

		for (let i = 0; i < roles.length; i++) {
			const check = roles[i];
			if (allowed.indexOf(check) > -1) {
				is_allowed = true;
				break;
			}
		}

		return is_allowed;
	};

	// return a middleware
	return (req, res, next) => {
		if (req.auth_user && isAllowed(req.auth_user.roles)) {
			next();
		} else {
			next(createError(403, "Forbidden"));
		}
	};
};

module.exports = checkRole;
