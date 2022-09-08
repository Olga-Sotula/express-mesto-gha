const Card = require('../models/card');
const { STATUS_OK } = require('../errors/constants');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');
const { ErrorNotFound } = require('../errors/ErrorNotFound');
const { ErrorForbidden } = require('../errors/ErrorForbidden');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(STATUS_OK).send({ data: cards }))
    .catch(() => next(new ErrorServer('Произошла ошибка')));
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(ErrorBadRequest('Ошибка данных в запросе'));
      } else {
        next(new ErrorServer('Произошла ошибка'));
      }
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => new ErrorNotFound('Карточка не найдена'))
    .then((card) => {
      if (card.owner !== req.user._id) {
        next( new ErrorForbidden('Отсутствуют права на удаление карточки');
      } else {
        Card.findByIdAndRemove(cardId)
        .then((card) => {
          res.status(STATUS_OK).send({ data: card });
        });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new ErrorBadRequest('Ошибка данных в запросе: некорректный Id'));
      } else {
        next(new ErrorServer('Произошла ошибка'));
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new ErrorNotFound('Карточка не найдена'))
    .then((card) => {
      res.status(STATUS_OK).send(card);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(ErrorBadRequest('Ошибка данных в запросе: некорректный Id'));
      } else {
        next(new ErrorServer('Произошла ошибка'));
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new ErrorNotFound('Карточка не найдена'))
    .then((card) => {
      res.status(STATUS_OK).send({ data: card });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new ErrorBadRequest('Ошибка данных в запросе: некорректный Id'));
      } else {
        next(new ErrorServer('Произошла ошибка'));
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
