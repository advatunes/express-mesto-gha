const mongoose = require("mongoose");
const Card = require("../models/card");

module.exports.createCard = (req, res) => {
  const {
    name, link, likes,
  } = req.body;
  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
    likes,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: `Ошибка валидации: ${err.message}` });
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.deleteCardUserById = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    res.status(400).send({ message: "Некорректный ID карточки" });
  } else {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: "Карточка не найдена" });
        }
        res.send({ message: "Карточка удалена" });
      })
      .catch(() => {
        res.status(500).send({ message: "Произошла ошибка" });
      });
  }
};

module.exports.likeCard = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    res.status(400).send({ message: "Некорректный ID карточки" });
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найдена" });
      }
      res.send({ data: card });
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.dislikeCard = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    res.status(400).send({ message: "Некорректный ID карточки" });
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найдена" });
      }
      res.send({ data: card });
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};
