const rescue = require('express-rescue');
const { validateEmailFormat, validateNameLength } = require('../middlewares');
const { createService, readByIdService, updateService, deleteService } = require('../services');
const {
  STATUS_400_BAD_REQUEST,
  STATUS_200_OK,
  STATUS_201_CREATED,
  STATUS_409_CONFLICT,
  STATUS_422_UNPROCESSABLE_ENTITY,
  checkInvalidEmail,
  STATUS_404_NOT_FOUND,
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
      .json({ message: 'Invalid fields'});
  }
});

const read = rescue(async (req, res) => {
  try {
    const { id } = req.params;

    const result = await readByIdService(id);

    if (!(result.user)) {
      throw new Error();
    }

    return res.status(STATUS_200_OK).json(result);
  } catch (error) {
    console.error(error.message);
    return res
      .status(STATUS_422_UNPROCESSABLE_ENTITY)
      .json({ message: 'User not found' });
  }
});

const update = rescue(async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const user = { ...body, _id: id };

    const result = await updateService(user);
    console.log('RESULT: ', result)

    if (result?.registered) {
      return res
        .status(STATUS_409_CONFLICT)
        .json({ message: 'User already registered!' });
    }

    return res.status(STATUS_200_OK).json(result);
  } catch (error) {
    console.error(error.message);
    return res
      .status(STATUS_422_UNPROCESSABLE_ENTITY)
      .json({ message: 'Error while updating' });
  }
});

const deleteUser = rescue(async (req, res) => {
  try {
    const { id } = req.params;
    await deleteService(id);

    return res.status(STATUS_200_OK).json({ message: 'user removed successfully'});
  } catch (error) {
    console.error(error.message);
    return res
      .status(STATUS_404_NOT_FOUND)
      .json({ message: 'Error while delete' });
  }
})

module.exports = {
  create,
  read,
  update,
  deleteUser,
};
