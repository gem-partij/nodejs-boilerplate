const createError = require("http-errors");

const get_user_login = (req) => {
	return req.auth_user;
};

const response_json = async (req, res, next, callable) => {
	try {
		const data = await callable();
		res.json({
			status: 200,
			message: "OK",
			data: data,
		});
	} catch (err) {
		console.error(err);
		next(createError(err.status ? err.status : 500, err.message));
	}
};

const datetime_now = () => {
	let date_ob = new Date();

	// adjust 0 before single digit date
	let date = ("0" + date_ob.getDate()).slice(-2);

	// current month
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

	// current year
	let year = date_ob.getFullYear();

	// current hours
	let hours = date_ob.getHours();

	// current minutes
	let minutes = date_ob.getMinutes();

	// current seconds
	let seconds = date_ob.getSeconds();

	// prints date & time in YYYY-MM-DD HH:MM:SS format
	return (
		year +
		"-" +
		month +
		"-" +
		date +
		" " +
		hours +
		":" +
		minutes +
		":" +
		seconds
	);
};

module.exports = {
	get_request_token: (req) => {
		if (
			req.headers.authorization &&
			req.headers.authorization.split(" ")[0].toLowerCase() === "bearer"
		) {
			return req.headers.authorization.split(" ")[1];
		} else if (req.query && req.query.token) {
			return req.query.token;
		}
		// return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAucGRhbWtvdGFzbWcuY28uaWQ6NTgwODBcL3BkYW0tZ2lzLWFwaVwvcHVibGljXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNTk3MTIwMTIzLCJleHAiOjE1OTcxNjMzMjMsIm5iZiI6MTU5NzEyMDEyMywianRpIjoiMlB1TnBBZGdodDBaZjlSdSIsInN1YiI6NjA2LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.csVDJI_6B-OXJbA6xcMM3AfWSRxAZszEdvgk8xIMX5w";
		return null;
	},

	get_user_login,

	response_json,
	datetime_now,
};
