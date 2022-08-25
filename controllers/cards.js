const Card = require('../models/card');
const {
  StatusOk,
  StatusBadRequest,
  StatusNotFound,
  StatusServerError,
} = require('../errors/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(StatusOk).send(cards))
    .catch(() => res.status(StatusServerError).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(StatusOk).send(card))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(StatusBadRequest).send({ message: 'Ошибка данных в запросе' });
      } else {
        res.status(StatusServerError).send({ message: 'Произошла ошибка' });
      }
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(StatusNotFound).send({ message: 'Карточка не найдена' });
      } else {
        res.status(StatusOk).send(card);
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(StatusBadRequest).send({ message: 'Ошибка данных в запросе: некорректный Id' });
      } else {
        res.status(StatusServerError).send({ message: 'Произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(StatusNotFound).send({ message: 'Карточка не найдена' });
      } else {
        res.status(StatusOk).send(card);
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(StatusBadRequest).send({ message: 'Ошибка данных в запросе: некорректный Id' });
      } else {
        res.status(StatusServerError).send({ message: 'Произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(StatusNotFound).send({ message: 'Карточка не найдена' });
      } else {
        res.status(StatusOk).send(card);
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(StatusBadRequest).send({ message: 'Ошибка данных в запросе: некорректный Id' });
      } else {
        res.status(StatusServerError).send({ message: 'Произошла ошибка' });
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
