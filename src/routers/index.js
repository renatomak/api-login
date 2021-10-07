const express = require('express');
const { addUser } = require('../controllers');
const {
  validateIfTheNameExists,
  validateNameLength,
  validateIfTheEmailExists,
  validateEmailFormat,
} = require('../middlewares');

const router = express.Router();

router.post(
  '/users',
  validateIfTheNameExists,
  validateNameLength,
  validateIfTheEmailExists,
  validateEmailFormat,
  addUser
);

module.exports = router;
