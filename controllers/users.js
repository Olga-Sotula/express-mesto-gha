const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  StatusOk,
  StatusBadRequest,
  StatusNotFound,
  StatusServerError,
} = require('../errors/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(StatusOk).send(users))
    .catch(() => res.status(StatusServerError).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(StatusNotFound).send({ message: 'Пользователь не найден' });
      } else {
        res.status(StatusOk).send(user);
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(StatusBadRequest).send({ message: 'Ошибка данных в запросе: некорректный Id' });
      } else {
        res.status(StatusServerError).send({ message: 'Произошла ошибка' });
      }
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({ name, about, avatar, email, password: hashedPassword })
        .then((user) => res.status(StatusOk).send({ data: user }))
        .catch(next);
    })
    .catch(next);
    /*.catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(StatusBadRequest).send({ message: 'Ошибка данных в запросе' });
      } else {
        res.status(StatusServerError).send({ message: 'Произошла ошибка' });
      }
    });*/
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new Error ('Неправильный логин или пароль'))
    .then((user) => {
      console.log(password);
      console.log(user.password);
      bcrypt.compare(password, user.password)
        .then((isUserValid) => {
          if (isUserValid) {
            const token = jwt.sign({ _id: user._id }, 'SECRET');
            res.cookie('jwt', token, {
              maxAge: 604800000,
              httpOnly: true,
              sameSite: true,
            });
            res.status(StatusOk).send({ data: user });
          } else {
            res.status(StatusNotFound).send({ message: 'Неправильный логин или пароль' });
          }
        })
        .catch(next);
    })
    .catch(next);
};

const updateUserProfile = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => {
      if (!user) {
        res.status(StatusNotFound).send({ message: 'Пользователь не найден' });
      } else {
        res.status(StatusOk).send(user);
      }
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(StatusBadRequest).send({ message: 'Ошибка данных в запросе' });
      } else {
        res.status(StatusServerError).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => {
      if (!user) {
        res.status(StatusNotFound).send({ message: 'Пользователь не найден' });
      } else {
        res.status(StatusOk).send(user);
      }
    })
    .catch(() => res.status(StatusServerError).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
};
