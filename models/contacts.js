const { ObjectId } = require('mongodb');

let _collection;

const init = (db) => {
	_collection = db.collection("contacts");
}

const isReady = () => Boolean(_collection);

const get = async id => {
	if(!isReady()) {
		return {
			status: 503,
			data: {
				err: "Database not ready yet.",
				contact: {}
			}
		};
	}
	if(!ObjectId.isValid(id)) {
		return {
			status: 400,
			data: {
				err: "Invalid id.",
				contact: {}
			}
		};
	}

	const contactDoc = await _collection.findOne({
		_id: new ObjectId(id)
	});

	if(contactDoc)
		return {
			status: 200,
			data: {
				contact: contactDoc
			}
		};
	else
		return {
			status: 404,
			data: {
				err: "Contact not found.",
				contact: {}
			}
		};
}

const getAll = async () => {
	if(!isReady()) {
		return {
			status: 503,
			data: {
				err: "Database not ready yet.",
				contact: {}
			}
		};
	}

	const cursor = _collection.find({});
	const contactList = await cursor.toArray();
	return {
		status: 200,
		data: {
			contacts: contactList
		}
	};
}

module.exports = {
	init,
	isReady,
	get,
	getAll
}