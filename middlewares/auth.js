const jwt = require('jsonwebtoken');
const { ErrorBadAuth } = require('../errors/ErrorBadAuth');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, process.env['JWT.SECRET']);
  } catch (e) {
    next(new ErrorBadAuth('Ошибка аутентификации'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
