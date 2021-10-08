const express = require('express');
const { addUser, readUserById, updateUser } = require('../controllers');
const Middleware = require('../middlewares');

const router = express.Router();

router.post(
  '/users',
  Middleware.validateIfTheNameExists,
  Middleware.validateNameLength,
  Middleware.validateIfTheEmailExists,
  Middleware.validateEmailFormat,
  Middleware.validateIfThePasswordExists,
  addUser
);

router.get('/users/:id', readUserById);

router.put('/users/:id', updateUser);

module.exports = router;
