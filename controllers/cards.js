const Card = require('../models/card');

// const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.status(HTTP_CREATED).send(card))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(HTTP_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      }
      res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(HTTP_NOT_FOUND).send({ message: ' Карточка не найдена ' });
      } else {
        res.send({ data: card });
      }
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(HTTP_BAD_REQUEST).send({ message: 'Передан некорректный id карточки' });
      }
      res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(HTTP_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      res.send({ data: card });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(HTTP_BAD_REQUEST).send({ message: 'Передан некорректный id карточки' });
      }
      res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(HTTP_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      res.send({ data: card });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(HTTP_BAD_REQUEST).send({ message: 'Передан некорректный id карточки' });
      }
      res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};
