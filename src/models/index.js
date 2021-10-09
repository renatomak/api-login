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
  const result = await connect().then((db) =>
    db.collection(COLLECTION_NAME).findOne({ email })
  );
  return { user: result};
};

const updateModel = async (user) => {
  const { _id, name, email, password } = user;

  await connect().then((db) => {
    db.collection(COLLECTION_NAME).updateOne({ _id: ObjectId(_id) }, [
      { $set: { name, email, password } },
    ]);
  });
  return { user: { _id, name, email } };
};

const deleteModel = async (id) => {
  await connect().then((db) => db.collection(COLLECTION_NAME).deleteOne({ _id: ObjectId(id)}))
}

module.exports = {
  createModel,
  readByIdModel,
  findEmailModel,
  updateModel,
  deleteModel,
};
