const Card = require("../models/card");

module.exports.createCard = (req, res) => {
  const { name, link, likes, createdAt } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner, likes, createdAt })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: `Ошибка валидации: ${err.message}` });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: `Ошибка валидации: ${err.message}` });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.deleteCardUserById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточка не найдена" });
      }
      if (card.owner.toString() !== req.user._id) {
        return res
          .status(403)
          .send({ message: "Вы не можете удалить чужую карточку" });
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: "Карточка удалена" }))
        .catch((err) => {
          if (err.name === "ValidationError") {
            return res
              .status(400)
              .send({ message: `Ошибка валидации: ${err.message}` });
          }
          return res.status(500).send({ message: "Произошла ошибка" });
        });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: `Ошибка валидации: ${err.message}` });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};
