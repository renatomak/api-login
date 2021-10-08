const { create, getUserById, findByEmail, updateUser } = require('../models/');
const { messageError } = require('../util');

const createUser = async (user) => {
  try {
    const { email } = user;
    const registeredEmail = await findByEmail(email);

    if(registeredEmail) {
      return { registered: true }
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

const updateUserById = async (user) => {
  try {
    const result = await updateUser(user);
    return result;
  } catch (error) {
    throw Error(messageError(error.message, 'atualizar o usuário.'))
  }
}

module.exports = { createUser, findUserById, updateUserById };
