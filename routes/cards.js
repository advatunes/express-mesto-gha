const cardRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  createCard,
  getCards,
  deleteCardUserById,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardRouter.get("/", getCards);

module.exports = { cardRouter };

cardRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/^https?:\/\/(www\.)?\w+\.\w{2,}\/?.*$/i),
    }),
  }),
  createCard,
);

cardRouter.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }),
  likeCard,
);

cardRouter.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }),
  dislikeCard,
);

cardRouter.delete(
  "/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteCardUserById,
);
