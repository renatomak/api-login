const { create } = require('../models/');
const { messageError } = require('../util');

const createUser = async (user) => {
  try {
    const result = await create(user);
    return result;
  } catch (error) {
    throw Error(error.message + messageError('cadastrar Usuários'));
  }
};

module.exports = { createUser };
