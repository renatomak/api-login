const express = require('express');
const { addUser } = require('../controllers');

const router = express.Router();

router.post('/users', addUser);

module.exports = router;