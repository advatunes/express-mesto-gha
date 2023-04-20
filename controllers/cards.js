const mongoose = require("mongoose");
const Card = require("../models/card");
const {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

module.exports.createCard = (req, res) => {
  const { name, link, likes } = req.body;

  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
    likes,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res
          .status(STATUS_BAD_REQUEST)
          .send({ message: `Ошибка валидации: ${err.message}` });
      }
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Произошла ошибка" });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .populate("likes")
    .then((card) => res.send({ data: card }))
    .catch(() => {
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Произошла ошибка" });
    });
};

module.exports.deleteCardUserById = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    res
      .status(STATUS_BAD_REQUEST)
      .send({ message: "Некорректный ID карточки" });
  } else {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          res.status(STATUS_NOT_FOUND).send({ message: "Карточка не найдена" });
        }
        res.send({ message: "Карточка удалена" });
      })
      .catch(() => {
        res
          .status(STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: "Произошла ошибка" });
      });
  }
};

module.exports.likeCard = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    res
      .status(STATUS_BAD_REQUEST)
      .send({ message: "Некорректный ID карточки" });
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(STATUS_NOT_FOUND).send({ message: "Карточка не найдена" });
      }
      res.send({ data: card });
    })
    .catch(() => {
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Произошла ошибка" });
    });
};

module.exports.dislikeCard = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    res
      .status(STATUS_BAD_REQUEST)
      .send({ message: "Некорректный ID карточки" });
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(STATUS_NOT_FOUND).send({ message: "Карточка не найдена" });
      }
      res.send({ data: card });
    })
    .catch(() => {
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Произошла ошибка" });
    });
};
