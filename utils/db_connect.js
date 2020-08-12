var mysql = require("mysql");
var pgp = require("pg-promise")(/* options */);

var mysql_conn = () => {
	var connection = mysql.createConnection({
		host: process.env.GBT_DB_HOST,
		port: process.env.GBT_DB_PORT,
		user: process.env.GBT_DB_USERNAME,
		password: process.env.GBT_DB_PASSWORD,
	});

	connection.on("error", (err) => {
		console.error(err);
		// throw err;
	});

	return connection;
};

var pgsql_conn = () => {
	var host = process.env.GBT_DB_HOST;
	var port = process.env.GBT_DB_PORT;
	var user = process.env.GBT_DB_USERNAME;
	var password = process.env.GBT_DB_PASSWORD;
	var database = process.env.GBT_DB_DATABASE;

	return pgp(
		"postgres://" +
			user +
			":" +
			password +
			"@" +
			host +
			":" +
			port +
			"/" +
			database
	);
};

module.exports = {
	mysql: mysql_conn,
	pgsql: pgsql_conn,
};
