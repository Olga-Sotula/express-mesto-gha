const USER = require('../models/user');

const getUsers = (req, res) => {
  USER.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  USER.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.ststus(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  USER.create({ name, about, avatar })
    .then((user) => res.ststus(200).send(user))
    .catch((e) => {
      if (e.errors.name === 'ValidatorError') {
        return res.status(400).send({ message: 'Ошибка данных в запросе' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const updateUserProfile = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  USER.findByIdAndUpdate(userId, name, about)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.ststus(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  USER.findByIdAndUpdate(userId, avatar)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.ststus(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
