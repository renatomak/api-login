const STATUS_200_OK = 200;
const STATUS_201_CREATED = 201;
const STATUS_204_NO_CONTENT = 204;
const STATUS_400_BAD_REQUEST = 400;
const STATUS_401_UNAUTHORIZED = 401;
const STATUS_404_NOT_FOUND = 404;
const STATUS_409_CONFLICT = 409;
const STATUS_422_UNPROCESSABLE_ENTITY = 422;

const checkInvalidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return !(regex.test(email));
};

const messageError = (message) =>
  `\n\n\n******Erro ao ${message}******\n\n\n\n`;

module.exports = {
  STATUS_200_OK,
  STATUS_201_CREATED,
  STATUS_204_NO_CONTENT,
  STATUS_400_BAD_REQUEST,
  STATUS_401_UNAUTHORIZED,
  STATUS_404_NOT_FOUND,
  STATUS_409_CONFLICT,
  STATUS_422_UNPROCESSABLE_ENTITY,
  messageError,
  checkInvalidEmail,
};
