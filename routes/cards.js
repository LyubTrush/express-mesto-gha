const cardRoutes = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCard);
cardRoutes.delete('/:cardId', deleteCard);
cardRoutes.put('/cards/:cardId/likes', likeCard);
cardRoutes.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRoutes;
