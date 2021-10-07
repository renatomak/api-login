const { create, getUserById, findByEmail } = require('../models/');
const { messageError } = require('../util');

const createUser = async (user) => {
  try {
    const { email } = user;
    const registeredEmail = await findByEmail(email);
    if(registeredEmail) {
      throw new Error('Usuário já cadastrado!');
    }
    const result = await create(user);
    return result;
  } catch (error) {
    throw Error(messageError(error.message, 'cadastrar Usuários'));
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
