const express = require('express');
const { create, read, update } = require('../controllers');
const Middleware = require('../middlewares');

const router = express.Router();

router.post(
  '/users',
  Middleware.validateIfTheNameExists,
  Middleware.validateNameLength,
  Middleware.validateIfTheEmailExists,
  Middleware.validateEmailFormat,
  Middleware.validateIfThePasswordExists,
  create
);

router.get('/users/:id', read);

router.put('/users/:id', update);

module.exports = router;
