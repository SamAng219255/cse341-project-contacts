const { ObjectId } = require("mongodb");

const keys = [ "firstName", "lastName", "email", "favoriteColor", "birthday" ];

let _collection;

const init = db => {
	_collection = db.collection("contacts");
};

const isReady = () => Boolean(_collection);

function checkReady(ifReady) {
	return (...args) => {
		if(!isReady()) {
			return {
				status: 503,
				data: {
					err: "Database not ready yet.",
					contact: {},
				},
			};
		}
		return ifReady(...args);
	};
}

const get = checkReady(async id => {
	if(!ObjectId.isValid(id)) {
		return {
			status: 400,
			data: {
				err: "Invalid id.",
				contact: {},
			},
		};
	}

	const contactDoc = await _collection.findOne({ _id: new ObjectId(id) });

	if(contactDoc)
		return {
			status: 200,
			data: { contact: contactDoc },
		};
	else
		return {
			status: 404,
			data: {
				err: "Contact not found.",
				contact: {},
			},
		};
});

const getAll = checkReady(async() => {
	const cursor = _collection.find({});
	const contactList = await cursor.toArray();
	return {
		status: 200,
		data: { contacts: contactList },
	};
});

const create = checkReady(async data => {
	const _id = new ObjectId();
	const result = await _collection.insertOne({
		_id,
		...data,
	});
	if(result.acknowledged)
		return {
			status: 201,
			data: { id: _id },
		};
	else
		return {
			status: 500,
			data: {
				err: "Write was not acknowledged.",
				data: {},
			},
		};
});

const update = checkReady(async(id, data) => {
	const _id = new ObjectId(id);

	const result = await _collection.updateOne(
		{ _id },
		{ $set: data },
	);
	if(!result.acknowledged)
		return {
			status: 500,
			data: {
				err: "Write was not acknowledged.",
				data: {},
			},
		};
	else if(result.matchedCount < 1)
		return {
			status: 404,
			data: {
				err: "Contact not found.",
				contact: {},
			},
		};
	else
		return {
			status: 200,
			data: { contact: await _collection.findOne({ _id }) },
		};
});

const remove = checkReady(async id => {
	const _id = new ObjectId(id);

	const findResult = await get(id);
	
	if(findResult.status != 200)
		return findResult;
	else
		_collection.deleteOne({ _id });
		return {
			status: 204,
			data: {},
		};
});

module.exports = {
	keys,
	init,
	isReady,
	get,
	getAll,
	create,
	update,
	remove,
};
