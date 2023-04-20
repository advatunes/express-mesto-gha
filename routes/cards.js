const cardRouter = require("express").Router();
const {
  createCard,
  getCards,
  deleteCardUserById,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardRouter.post("/", createCard);
cardRouter.get("/", getCards);
cardRouter.delete("/:cardId", deleteCardUserById);
cardRouter.put("/:cardId/likes", likeCard);
cardRouter.delete("/:cardId/likes", dislikeCard);

module.exports = { cardRouter };
