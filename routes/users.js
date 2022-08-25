const userRouter = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

userRoutes.get("/", express.json(), getUsers);
userRoutes.get("/:id", express.json(), getUserById);
userRoutes.post("/", express.json(), createUser);

module.exports = {
  userRouter
};
