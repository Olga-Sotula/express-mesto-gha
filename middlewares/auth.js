const jwt = require('jsonwebtoken');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, process.env['JWT.SECRET']);
  } catch (e) {
    next(new ErrorBadRequest('Ошибка аутентификации'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
