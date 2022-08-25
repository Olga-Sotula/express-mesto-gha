const express = require('express');

const userRouter = express.Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

userRouter.get('/users', express.json(), getUsers);
userRouter.get('/users/:userId', express.json(), getUserById);
userRouter.post('/users', express.json(), createUser);

module.exports = {
  userRouter,
};
