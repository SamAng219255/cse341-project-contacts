const { MongoClient } = require("mongodb");

let _db;

const initDB = callback => {
	if(_db) {
		console.log("Database is already initialized!");
		return callback(null, _db);
	}
	MongoClient.connect(process.env.MONGO_URI)
		.then(client => {
			_db = client.db("project1");
			callback(null, _db);
		})
		.catch(err => {
			callback(err);
		});
};

const getDB = () => {
	if(!_db) {
		throw Error("Database not initialized!");
	}
	return _db;
};

module.exports = {
	initDB,
	getDB,
};
