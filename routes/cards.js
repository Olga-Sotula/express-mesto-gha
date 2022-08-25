const express = require('express');

const cardRouter = express.Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/cards', express.json(), getCards);
cardRouter.post('/cards', express.json(), createCard);
cardRouter.delete('/cards/:cardId', express.json(), deleteCardById);
cardRouter.put('/cards/:cardId/likes', express.json(), likeCard);
cardRouter.delete('/cards/:cardId/likes', express.json(), dislikeCard);

module.exports = {
  cardRouter,
};
