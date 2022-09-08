const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { STATUS_OK } = require('../errors/constants');
const { ErrorNotFound } = require('../errors/ErrorNotFound');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');
const { ErrorEmailDublicate } = require('../errors/ErrorEmailDublicate');
const { ErrorBadAuth } = require('../errors/ErrorBadAuth');

const getUsers = (req, res, next) => {
  console.log(req.user);
  User.find({})
    .then((users) => res.status(STATUS_OK).send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new ErrorNotFound('Пользователь не найден'))
    .then((user) => {
      res.status(STATUS_OK).send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new ErrorBadRequest('Ошибка данных в запросе: некорректный Id'));
      } else {
        next(e);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hashedPassword,
      })
        .then((user) => {
          const createdUser = {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          };
          res.status(STATUS_OK).send({ data: createdUser });
        })
        .catch((e) => {
          if (e.code === 11000) {
            next(new ErrorEmailDublicate('Ошибка данных в запросе: пользователь с таким email существует'));
          } else if (e.name === 'ValidationError') {
            next(new ErrorBadRequest('Ошибка данных в запросе'));
          } else {
            next(e);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new ErrorBadAuth('Неправильный логин или пароль'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isUserValid) => {
          if (isUserValid) {
            const token = jwt.sign({ _id: user._id }, process.env['JWT.SECRET']);
            res.cookie('jwt', token, {
              maxAge: 604800000,
              httpOnly: true,
              sameSite: true,
            });
            res.status(STATUS_OK).send({ data: user });
          } else {
            next(new ErrorBadAuth('Неправильный логин или пароль'));
          }
        })
        .catch(next);
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  console.log(userId);
  console.log(req.body);
  User.findByIdAndUpdate(userId, { name, about }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(() => new ErrorNotFound('Пользователь не найден'))
    .then((user) => {
      console.log(user);
      res.status(STATUS_OK).send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new ErrorBadRequest('Ошибка данных в запросе'));
      } else {
        next(e);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(() => new ErrorNotFound('Пользователь не найден'))
    .then((user) => {
      res.status(STATUS_OK).send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new ErrorBadRequest('Ошибка данных в запросе'));
      } else {
        next(e);
      }
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
};
