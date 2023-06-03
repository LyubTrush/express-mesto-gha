const cardRoutes = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidate,
  cardIdValidate,
} = require('../middlewares/validation');

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCardValidate, createCard);
cardRoutes.delete('/:cardId', cardIdValidate, deleteCard);
cardRoutes.put('/:cardId/likes', cardIdValidate, likeCard);
cardRoutes.delete('/:cardId/likes', cardIdValidate, dislikeCard);

module.exports = cardRoutes;
