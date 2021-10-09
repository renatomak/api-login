const { STATUS_400_BAD_REQUEST, checkInvalidEmail } = require('../util');

const validateIfTheNameExists = (req, res, next) => {
  const { name } = req.body;

  if (!name)
    return res
      .status(STATUS_400_BAD_REQUEST)
      .send({ message: 'The "name" field is mandatory.' });

  next();
};

const validateNameLength = (req, res, next) => {
  const { name } = req.body;

  if (name && name.length < 3) {
    return res
      .status(STATUS_400_BAD_REQUEST)
      .send({ message: 'The "name" field must be at least 3 characters long' });
  }
  
  next();
};

const validateIfTheEmailExists = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(STATUS_400_BAD_REQUEST).send({ message: 'The "email" field is mandatory' });
  }
  next();
}

const validateEmailFormat = (req, res, next) => {
  const { email } = req.body;

  if (email && checkInvalidEmail(email)) {
    return res
      .status(STATUS_400_BAD_REQUEST)
      .send({ message: 'The "email" must have the format "email@email.com"' });
  }
  
  next();
};

const validateIfThePasswordExists = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') { 
    return res.status(STATUS_400_BAD_REQUEST).send({ message: 'The "password" field is required' });
  }

  next();
}



module.exports = {
    validateIfTheNameExists,
    validateNameLength, 
    validateIfTheEmailExists,
    validateEmailFormat,
    validateIfThePasswordExists,
}
