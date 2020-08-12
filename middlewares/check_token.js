const jwt = require("express-jwt");

const checkToken = jwt({
	secret: process.env.GBT_JWT_KEY,
	algorithms: ["HS256"],
	//algorithms: ['RS256']
});

module.exports = checkToken;
