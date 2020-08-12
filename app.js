require("dotenv").config();
require("sexy-require");

if (process.env.GBT_ENV == "production") {
	const Sentry = require("@sentry/node");
	Sentry.init({
		dsn: "",
	});
}

const createError = require("http-errors");
const logger = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");

const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();

// const accessLogStream = rfs.createStream("access.log", {
// 	interval: "1d", // rotate daily
// 	path: path.join(__dirname, "logs"),
// });

app.use(logger("dev"));

// create a rotating write stream
const errorLogStream = rfs.createStream("access-error.log", {
	interval: "1d", // rotate daily
	path: path.join(__dirname, "logs/errors"),
});
// log only 4xx and 5xx responses to file
app.use(
	logger("combined", {
		stream: errorLogStream,
		skip: (req, res) => {
			return res.statusCode < 400;
		},
	})
);

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("/routes/index"));
// app.use("/auth", require("/routes/auth"));
// app.use("/users", require("/routes/users"));

app.use(require("/middlewares/validate_token"));
app.use("/survey", require("/routes/survey"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	const modeDevelopment = req.app.get("env") === "development";

	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = modeDevelopment ? err : {};

	let errResponse = err;
	if (err.name === "UnauthorizedError" && !modeDevelopment) {
		errResponse = "Unauthorized";
	}

	// console.log(errResponse);

	// render the error page
	res.status(err.status || 500);
	res.send({
		status: err.status,
		message: err.message,
		data: errResponse,
	});
});

module.exports = app;
