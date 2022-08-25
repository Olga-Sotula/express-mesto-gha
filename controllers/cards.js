const Card = require('../models/card');
const errorStatus = require('../errors/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(errorStatus.ok).send(cards))
    .catch(() => res.status(errorStatus.serverError).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(errorStatus.ok).send(card))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(errorStatus.badRequest).send({ message: 'Ошибка данных в запросе' });
      } else {
        res.status(errorStatus.serverError).send({ message: 'Произошла ошибка' });
      }
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(errorStatus.notFound).send({ message: 'Карточка не найдена' });
      } else {
        res.status(errorStatus.ok).send(card);
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(errorStatus.badRequest).send({ message: 'Ошибка данных в запросе: некорректный Id' });
      } else {
        res.status(errorStatus.serverError).send({ message: 'Произошла ошибка' });
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
        res.status(errorStatus.notFound).send({ message: 'Карточка не найдена' });
      } else {
        res.status(errorStatus.ok).send(card);
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(errorStatus.badRequest).send({ message: 'Ошибка данных в запросе: некорректный Id' });
      } else {
        res.status(errorStatus.serverError).send({ message: 'Произошла ошибка' });
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
        res.status(errorStatus.notFound).send({ message: 'Карточка не найдена' });
      } else {
        res.status(errorStatus.ok).send(card);
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(errorStatus.badRequest).send({ message: 'Ошибка данных в запросе: некорректный Id' });
      } else {
        res.status(errorStatus.serverError).send({ message: 'Произошла ошибка' });
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
