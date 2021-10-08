const connect = require('../../config/conn');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'users';

const create = async ({name, email, password}) =>
  connect().then(async (db) => {
    const result = await db.collection(COLLECTION_NAME).insertOne({ name, email, password });
    return { _id: result.insertedId, name, email };
  });

const getUserById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connect().then((db) =>
    db.collection(COLLECTION_NAME).findOne(ObjectId(id))
  );
};

const findByEmail = async (email) => {
  return connect().then((db) =>
    db.collection(COLLECTION_NAME).findOne({ email })
  );
};


module.exports = {
  create,
  getUserById,
  findByEmail,
};
