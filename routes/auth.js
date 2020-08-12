const express = require("express");
const router = express.Router();

const axios = require("axios");
const jsonwebtoken = require("jsonwebtoken");
const helpers = require("/utils/helpers");

router.get("/", function (req, res, next) {
	const headers = {
		Accept: "application/json",
		Authorization: "Bearer " + helpers.get_request_token(req),
	};

	axios
		.get(process.env.GBT_URL_AUTH + "/api/auth/me", {
			headers,
			params: {},
		})
		.then((response) => {
			if (response.data.data) {
				const responseData = response.data.data;
			}
			console.log(response);
		})
		.catch((error) => {
			console.error(error);
		});

	res.send("OK");
});

module.exports = router;
