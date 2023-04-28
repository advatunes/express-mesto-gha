const createUserRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { createUser } = require("../controllers/users");

createUserRouter.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/^https?:\/\/(www\.)?\w+\.\w{2,}\/?.*$/i),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

module.exports = { createUserRouter };
