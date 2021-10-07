const rescue = require('express-rescue');
const { createUser, findUserById } = require('../services');
const {
  STATUS_400_BAD_REQUEST,
  STATUS_200_OK,
  STATUS_201_CREATED,
} = require('../util');

const addUser = rescue(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await createUser({ name, email, password });

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

    const result = await findUserById(id);

    return res.status(STATUS_200_OK).json(result);
  } catch (error) {
    return res
      .status(STATUS_400_BAD_REQUEST)
      .json({ message: 'Invalid fields ' + error.message });
  }
});

module.exports = {
  addUser,
  readUserById,
};
