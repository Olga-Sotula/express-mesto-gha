const USER = require('../models/user');

const getUsers = (req, res) => {
  res.status(200).send(req.body);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  res.status(200).send(req.body);
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  USER.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};