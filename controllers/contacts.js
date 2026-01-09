const model = require("../models/contacts");

const get = async (req, res, next) => {
	const {status, data} = await model.get(req.params.id);

	res.status(status).json(data);
}

const getAll = async (req, res, next) => {
	const {status, data} = await model.getAll();

	res.status(status).json(data);
}

module.exports = {
	get,
	getAll
}