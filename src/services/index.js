const { create, getUserById } = require('../models/');
const { messageError } = require('../util');

const createUser = async (user) => {
  try {
    const result = await create(user);
    return result;
  } catch (error) {
    throw Error(error.message + messageError('cadastrar Usuários'));
  }
};

const findUserById = async (id) => {
  try {
    const result = await getUserById(id);

    return { result };
  } catch (error) {
    throw Error(error.message + messageError('buscar Usuários por ID'));
  }
};

module.exports = { createUser, findUserById };
