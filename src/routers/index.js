const express = require('express');
const { addUser } = require('../controllers');
const {
  validateIfTheNameExists,
  validateNameLength,
} = require('../middlewares');

const router = express.Router();

router.post('/users', validateIfTheNameExists, validateNameLength, addUser);

module.exports = router;
