const express = require('express');

const cardRouter = express.Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { createCardValidator } = require('../middlewares/validation');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCardValidator, createCard);
cardRouter.delete('/cards/:cardId', deleteCardById);
cardRouter.put('/cards/:cardId/likes', likeCard);
cardRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = {
  cardRouter,
};
