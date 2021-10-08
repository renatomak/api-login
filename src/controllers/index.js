const rescue = require('express-rescue');
const { createUser, findUserById, updateUserById } = require('../services');
const {
  STATUS_400_BAD_REQUEST,
  STATUS_200_OK,
  STATUS_201_CREATED,
  STATUS_409_CONFLICT,
  STATUS_422_UNPROCESSABLE_ENTITY,
} = require('../util');

const addUser = rescue(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await createUser({ name, email, password });

    if (user.registered) {
      return res.status(STATUS_409_CONFLICT).json({ message: 'Usuário já cadastrado!' })
    }

    return res.status(STATUS_201_CREATED).json({ user });
  } catch (error) {
    console.error(error.message);
    return res
      .status(STATUS_400_BAD_REQUEST)
      .json({ message: 'Invalid fields' + error.message });
  }
});

const readUserById = rescue(async (req, res) => {
  try {
    const { id } = req.params;

    const { result } = await findUserById(id);

    if (!result) {
      throw new Error();
    }

    return res.status(STATUS_200_OK).json(result);
  } catch (error) {
    console.error(error.message);
    return res
      .status(STATUS_422_UNPROCESSABLE_ENTITY)
      .json({ message: 'Wrong id format' });
  }
});

const updateUser = rescue(async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const user = { ...body, id };

    const result = await updateUserById(user);
    console.log(result)

    return res.status(STATUS_200_OK).json(result);
  } catch (error) {
    console.error(error.message);
    return res.status(STATUS_422_UNPROCESSABLE_ENTITY).json({ message: 'Erro ou atualizar'})
  }
})

module.exports = {
  addUser,
  readUserById,
  updateUser,
};
