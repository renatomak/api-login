const { STATUS_400_BAD_REQUEST } = require('../util');

const validateIfTheNameExists = (req, res, next) => {
  const { name } = req.body;

  if (!name)
    return res
      .status(STATUS_400_BAD_REQUEST)
      .send({ message: 'O campo "name" é obrigatório' });

  next();
};

const validateNameLength = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 3) {
    return res
      .status(STATUS_400_BAD_REQUEST)
      .send({ message: 'O campo "name" deve ter pelo menos 3 caracteres' });
  }
  
  next();
};

module.exports = {
    validateIfTheNameExists,
    validateNameLength
}
