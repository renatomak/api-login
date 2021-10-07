const connect = require('../../config/conn');

const COLLECTION_NAME = 'user';

const create = async (user) => 
    connect().then(async (db) => {
        const result = await db.collection(COLLECTION_NAME)
        .insertOne(user);
        const { name, email } = user;
        return { name, email };
    });

module.exports = {
    create,
}