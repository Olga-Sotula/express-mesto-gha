const express = require('express');

const { createUserValidator } = require('../middlewares/validation');

const authRouter = express.Router();
const {
  createUser,
  login,
} = require('../controllers/users');

authRouter.post('/signup', createUserValidator, createUser);
authRouter.post('/signin', login);

module.exports = {
  authRouter,
};
