const { findEmailModel, createModel, readByIdModel, updateModel } = require('../models');
const { messageError } = require('../util');

const createService = async (user) => {
  try {
    const { email } = user;
    const registeredEmail = await findEmailModel(email);

    if(registeredEmail) {
      return { registered: true }
    }
    const result = await  createModel(user);
    return result;
  } catch (error) {
    throw Error(messageError(error.message, 'cadastrar Usuários'));
  }
};

const readByIdService = async (id) => {
  try {
    const result = await readByIdModel(id);

    return { result };
  } catch (error) {
    throw Error(error.message + messageError('buscar Usuários por ID'));
  }
};

const updateService = async (user) => {
  try {
    const result = await updateModel(user);
    return result;
  } catch (error) {
    throw Error(messageError(error.message, 'atualizar o usuário.'))
  }
}

module.exports = { createService, readByIdService, updateService };
