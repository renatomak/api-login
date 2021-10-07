const connect = require('../../config/conn');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'user';

const create = async (user) => 
    connect().then(async (db) => {
        await db.collection(COLLECTION_NAME)
        .insertOne(user);
        const { name, email } = user;
        return { name, email };
    });

const getUserById = async (id) => {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    return connect().then((db) => db.collection(COLLECTION_NAME).findOne(ObjectId(id)));
};

module.exports = {
    create,
    getUserById,
}