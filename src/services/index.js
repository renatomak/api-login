const { create } = require('../models/');


const createUser = async (name, email, password) => {
    const result = await create(name, email, password);
    return result;
}

module.exports = { createUser };