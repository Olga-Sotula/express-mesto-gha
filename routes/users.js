const express = require('express');

const userRouter = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', express.json(), getUsers);
userRouter.get('/users/:userId', express.json(), getUserById);
userRouter.post('/users', express.json(), createUser);
userRouter.patch('/users/me', express.json(), updateUserProfile);
userRouter.patch('/users/me/avatar', express.json(), updateUserAvatar);

module.exports = {
  userRouter,
};
