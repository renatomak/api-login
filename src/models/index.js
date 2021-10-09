const connect = require('../../config/conn');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'users';

const createModel = async ({ name, email, password }) =>
  connect().then(async (db) => {
    const result = await db
      .collection(COLLECTION_NAME)
      .insertOne({ name, email, password });
    const user = { _id: result.insertedId, name, email };
    return user;
  });

const readByIdModel = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connect().then(async (db) => {
    const user = await db.collection(COLLECTION_NAME).findOne(ObjectId(id));
    return { user };
  });
};

const findEmailModel = async (email) => {
  return connect().then((db) =>
    db.collection(COLLECTION_NAME).findOne({ email })
  );
};

const updateModel = async (user) => {
  const { id, name, email, password } = user;

  if (!ObjectId.isValid(id)) {
    return null;
  }

  await connect().then((db) => {
    db.collection(COLLECTION_NAME).updateOne({ _id: ObjectId(id) }, [
      { $set: { name, email, password } },
    ]);
  });
  return { user: { _id: id, name, email } };
};

module.exports = {
  createModel,
  readByIdModel,
  findEmailModel,
  updateModel,
};
