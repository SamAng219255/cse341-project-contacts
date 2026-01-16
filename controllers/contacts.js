const model = require("../models/contacts");

const get = async(req, res, next) => {
	const { status, data } = await model.get(req.params.id);

	/*
		#swagger.responses[200] = {
			description: 'Contact found and returned.',
			schema: {
				firstName: "John",
				lastName: "Doe",
				email: "john@example.com",
				favoriteColor: "red",
				birthday: "1 Jan"
			}
		}
		#swagger.responses[503] = { description: 'Server still turning on and not yet connected to database.' }
		#swagger.responses[400] = { description: 'Client provided an invalid id.' }
		#swagger.responses[404] = { description: 'No contact with the provided id exists.' }
	*/
	return res.status(status).json(data);
};

const getAll = async(req, res, next) => {
	const { status, data } = await model.getAll();

	/*
		#swagger.responses[200] = {
			description: 'Full list of contacts returned. May be empty.',
			schema: [{
				firstName: "John",
				lastName: "Doe",
				email: "john@example.com",
				favoriteColor: "red",
				birthday: "1 Jan"
			}]
		}
		#swagger.responses[503] = { description: 'Server still turning on and not yet connected to database.' }
	*/
	return res.status(status).json(data);
};

const create = async(req, res, next) => {
	/*
	#swagger.parameters['New Contact Information'] = {
		in: 'body',
		description: 'New value to update contact record with.',
		required: true,
		schema: {
			$firstName: "John",
			$lastName: "Doe",
			$email: "john@example.com",
			$favoriteColor: "red",
			$birthday: "1 Jan"
		}
	}
	*/

	if(!model.keys.every(key => key in req.body)) {
		// #swagger.responses[400] = { description: 'Client did not provide sufficient data to create a contact record.' }
		return res.status(400).json({ err: "Insufficient data." });
	}

	const bodyData = Object.fromEntries(model.keys.map(key => [ key, req.body[key] ]));

	const { status, data } = await model.create(bodyData);

	/*
		#swagger.responses[201] = {
			description: 'Contact successfully created.',
			schema: {
				id: "000000000000000000000000"
			}
		}
		#swagger.responses[503] = { description: 'Server still turning on and not yet connected to database.' }
		#swagger.responses[500] = { description: 'Internal database error.' }
	*/
	return res.status(status).json(data);
};

const update = async(req, res, next) => {
	/*
	#swagger.parameters['New Contact Information'] = {
		in: 'body',
		description: 'New value to update contact record with.',
		required: true,
		schema: {
			firstName: "John",
			lastName: "Doe",
			email: "john@example.com",
			favoriteColor: "red",
			birthday: "1 Jan"
		}
	}
	*/
	const bodyData = Object.fromEntries(model.keys.filter(key => key in req.body).map(key => [ key, req.body[key] ]));

	const { status, data } = await model.update(req.params.id, bodyData);

	/*
		#swagger.responses[200] = {
			description: 'Contact found and updated. The body is the new complete contact record.',
			schema: {
				firstName: "John",
				lastName: "Doe",
				email: "john@example.com",
				favoriteColor: "red",
				birthday: "1 Jan"
			}
		}
		#swagger.responses[503] = { description: 'Server still turning on and not yet connected to database.' }
		#swagger.responses[500] = { description: 'Internal database error.' }
		#swagger.responses[404] = { description: 'No contact with the provided id exists.' }
	*/
	return res.status(status).json(data);
};

const remove = async(req, res, next) => {
	const { status, data } = await model.remove(req.params.id);

	/*
		#swagger.responses[204] = { description: 'Contact found and deleted.' }
		#swagger.responses[503] = { description: 'Server still turning on and not yet connected to database.' }
		#swagger.responses[404] = { description: 'No contact with the provided id exists.' }
	*/
	return res.status(status).json(data);
};

module.exports = {
	get,
	getAll,
	create,
	update,
	remove,
};
