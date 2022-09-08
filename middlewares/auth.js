const jwt = require('jsonwebtoken');
const { ErrorBadAuth } = require('../errors/ErrorBadAuth');

const auth = (req, res, next) => {
  const { authorization } = req.user._id;
  console.log('áuth');
  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorBadAuth('Ошибка аутентификации');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (e) {
    next(new ErrorBadAuth('Ошибка аутентификации'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
