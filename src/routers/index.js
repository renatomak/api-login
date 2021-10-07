const express = require('express');
const { addUser } = require('../controllers');
const {
  validateIfTheNameExists,
  validateNameLength,
  validateIfTheEmailExists,
} = require('../middlewares');

const router = express.Router();

router.post(
  '/users',
  validateIfTheNameExists,
  validateNameLength,
  validateIfTheEmailExists,
  addUser
);

module.exports = router;
