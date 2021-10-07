const rescue = require('express-rescue');
const { createUser } = require('../services');

const addUser = rescue(async (req, res) => {

        const {name, email, password } = req.body;

        const user = await createUser(name, email, password);

        return res.status(201).json({ user });
})

module.exports = {
    addUser,
}

