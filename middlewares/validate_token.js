const createError = require("http-errors");
const axios = require("axios");

const helpers = require("/utils/helpers");
const redis = require("/utils/redis");

const validateToken = async (req, res, next) => {
	try {
		const token = helpers.get_request_token(req);

		const headers = {
			Accept: "application/json",
			Authorization: "Bearer " + token,
		};

		const cache_seconds = 60 * 60 * 1; // 1 jam

		const response = await redis.remember(
			"validateToken(" + token + ")",
			cache_seconds,
			async () => {
				const resp = await axios.get(
					process.env.GBT_URL_AUTH + "/api/auth/me",
					{
						headers,
					}
				);
				return resp.data;
			}
		);

		if (response.data) {
			req.auth_user = response.data;
			next();
		} else {
			next(createError(500, "Invalid token"));
		}
	} catch (err) {
		console.error(err);
		// throw err;
		next(createError(401, "Unauthorized"));
	}
};

module.exports = validateToken;
