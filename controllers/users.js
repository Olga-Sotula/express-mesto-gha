const User = require('../models/user');
const errorStatus = require('../errors/constants.js');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(errorStatus.ok).send(users))
    .catch(() => res.status(errorStatus.serverError).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(errorStatus.notFound).send({ message: 'Пользователь не найден' });
      } else {
        res.status(errorStatus.ok).send(user);
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(errorStatus.badRequest).send({ message: 'Ошибка данных в запросе: некорректный Id' });
      } else {
        res.status(errorStatus.serverError).send({ message: 'Произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(errorStatus.ok).send(user))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(errorStatus.badRequest).send({ message: 'Ошибка данных в запросе' });
      } else {
        res.status(errorStatus.serverError).send({ message: 'Произошла ошибка' });
      }
    });
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
        res.status(errorStatus.notFound).send({ message: 'Пользователь не найден' });
      } else {
        res.status(errorStatus.ok).send(user);
      }
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(errorStatus.badRequest).send({ message: 'Ошибка данных в запросе' });
      } else {
        res.status(errorStatus.serverError).send({ message: 'Произошла ошибка' });
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
        res.status(errorStatus.notFound).send({ message: 'Пользователь не найден' });
      } else {
        res.status(errorStatus.ok).send(user);
      }
    })
    .catch(() => res.status(errorStatus.serverError).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
