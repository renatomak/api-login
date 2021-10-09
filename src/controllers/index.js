const rescue = require('express-rescue');
const { createService, readByIdService, updateService } = require('../services');
const {
  STATUS_400_BAD_REQUEST,
  STATUS_200_OK,
  STATUS_201_CREATED,
  STATUS_409_CONFLICT,
  STATUS_422_UNPROCESSABLE_ENTITY,
} = require('../util');

const create = rescue(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await createService({ name, email, password });

    if (user.registered) {
      return res
        .status(STATUS_409_CONFLICT)
        .json({ message: 'User already registered!' });
    }

    return res.status(STATUS_201_CREATED).json({ user });
  } catch (error) {
    console.error(error.message);

    return res
      .status(STATUS_400_BAD_REQUEST)
      .json({ message: 'Invalid fields' + error.message });
  }
});

const read = rescue(async (req, res) => {
  try {
    const { id } = req.params;

    const result = await readByIdService(id);

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

const update = rescue(async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const user = { ...body, id };

    const result = await updateService(user);

    return res.status(STATUS_200_OK).json(result);
  } catch (error) {
    console.error(error.message);
    return res
      .status(STATUS_422_UNPROCESSABLE_ENTITY)
      .json({ message: 'Error while updating' });
  }
});

module.exports = {
  create,
  read,
  update,
};
