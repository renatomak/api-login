const rescue = require('express-rescue');
const { createUser } = require('../services');

const addUser = rescue(async (req, res) => {
//   try {
    const { name, email, password } = req.body;

    const user = await createUser({ name, email, password });

    return res.status(201).json({ user });
//   } catch (error) {
//     console.error(error.message);
//     return res
//       .status(STATUS_400_BAD_REQUEST)
//       .json({ message: "Invalid fields" + error.message });
//   }
});

module.exports = {
  addUser,
};
