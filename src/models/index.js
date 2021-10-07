const connect = require('../../config/conn');

const COLLECTION_NAME = 'user';

const create = async (name, email, password) => 
    connect().then(async (db) => {
        const user = await db.collection(COLLECTION_NAME)
        .insertOne({ name, email, password});
        return {...user, name, email };
    });

module.exports = {
    create,
}