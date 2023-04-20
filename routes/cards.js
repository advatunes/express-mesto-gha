const cardRouter = require("express").Router();

const {
  createCard,
  getCards,
  deleteCardUserById,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardRouter.post("/cards", createCard);
cardRouter.get("/cards", getCards);
cardRouter.delete("/cards/:cardId", deleteCardUserById);
cardRouter.put("/cards/:cardId/likes", likeCard);
cardRouter.delete("/cards/:cardId/likes", dislikeCard);

module.exports = { cardRouter };
