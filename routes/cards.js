const cardRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  createCard,
  getCards,
  deleteCardUserById,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

// cardRouter.post("/cards", createCard);
cardRouter.get("/cards", getCards);
// cardRouter.delete("/cards/:cardId", deleteCardUserById);
// cardRouter.put("/cards/:cardId/likes", likeCard);
// cardRouter.delete("/cards/:cardId/likes", dislikeCard);

module.exports = { cardRouter };

cardRouter.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/^https?:\/\/(www\.)?\w+\.\w{2,}\/?.*$/i),
    }),
  }),
  createCard
);

cardRouter.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  likeCard
);

cardRouter.delete(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  dislikeCard
);

cardRouter.delete(
  "/cards/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteCardUserById
);
