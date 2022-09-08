const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { ErrorBadAuth } = require('../errors/ErrorBadAuth');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    next(new ErrorBadAuth('Ошибка аутентификации'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
