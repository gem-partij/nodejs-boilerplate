const createError = require("http-errors");

const checkRoleOrPermission = (allowed) => {
	const isAllowed = (role_or_permission) => {
		let is_allowed = false;

		for (let i = 0; i < role_or_permission.length; i++) {
			const check = role_or_permission[i];
			if (allowed.indexOf(check) > -1) {
				is_allowed = true;
				break;
			}
		}

		return is_allowed;
	};

	// return a middleware
	return (req, res, next) => {
		if (
			req.auth_user &&
			(isAllowed(req.auth_user.permissions) ||
				isAllowed(req.auth_user.roles))
		) {
			next();
		} else {
			next(createError(403, "Forbidden"));
		}
	};
};

module.exports = checkRoleOrPermission;
