const { celebrate, Joi } = require('celebrate');
const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const getUserValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const updateUserProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regex),
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regex),
  }),
});

const idValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  createUserValidator,
  loginValidator,
  getUserValidator,
  updateUserProfileValidator,
  updateUserAvatarValidator,
  createCardValidator,
  idValidator,
};
