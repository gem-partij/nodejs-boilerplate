const { promisify } = require("util");

const redis = require("redis");
const client = redis.createClient({
	host: process.env.GBT_REDIS_HOST,
	port: process.env.GBT_REDIS_PORT,
	password: process.env.GBT_REDIS_PASSWORD,
	prefix: "gistirta-nodejs",
});

// const a_set = promisify(client.set).bind(client);
const a_get = promisify(client.get).bind(client);
// const a_hset = promisify(client.hset).bind(client);
// const a_hget = promisify(client.hget).bind(client);
// const asmembers = promisify(client.smembers).bind(client);
// const ahkeys = promisify(client.hkeys).bind(client);
// const a_hmset = promisify(client.hmset).bind(client);
// const a_hgetall = promisify(client.hgetall).bind(client);
const a_exists = promisify(client.exists).bind(client);

client.on("error", (error) => {
	console.error(error);
	// throw error;
});

const remember = async (key, expires_in_seconds, callable) => {
	try {
		let data = null;

		const exists = await a_exists(key);
		if (exists === 1) {
			data = await a_get(key);
			data = JSON.parse(data);
			if (data == "null" || data == "undefined") {
				return null;
			}
		} else {
			data = await callable();
			if (!data) {
				return null;
			}
			const data_stringify = JSON.stringify(data);
			// console.log(data);
			client.set(key, data_stringify);
			client.expire(key, expires_in_seconds);
		}

		return data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

module.exports = {
	remember,
};
