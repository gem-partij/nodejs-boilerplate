const { mysql } = require("/utils/db_connect");
const helpers = require("/utils/helpers");

module.exports = {
	create: (data) => {
		return new Promise((resolve, reject) => {
			try {
				const db = mysql();
				db.connect();

				const datenow = helpers.datetime_now();
				data["created_at"] = datenow;
				data["updated_at"] = datenow;

				db.query(
					"INSERT INTO users SET ?",
					data,
					(err, results, fields) => {
						if (err) throw err;

						// console.log(results);
						resolve(results);
					}
				);

				db.end();
			} catch (err) {
				reject(err);
			}
		});
	},
};
