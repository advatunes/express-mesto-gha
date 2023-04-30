const Card = require("../models/card");

const {
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED_ACTION,
} = require("../utils/errors");

module.exports.createCard = (req, res, next) => {
  const { name, link, likes } = req.body;

  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
    likes,
  })

    .then((card) => res.send({ data: card }))

    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate("owner")
    .populate("likes")
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCardUserById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new STATUS_NOT_FOUND("Карточка не найдена");
      }
      if (card.owner.toString() !== req.user._id) {
        throw new STATUS_UNAUTHORIZED_ACTION("Нельзя удалить чужую карточку");
      } else {
        return Card.findByIdAndRemove(req.params.cardId);
      }
    })
    .then(() => {
      res.send({ message: "Карточка удалена" });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new STATUS_NOT_FOUND("Карточка не найдена");
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new STATUS_NOT_FOUND("Карточка не найдена");
      }
      res.send({ data: card });
    })
    .catch(next);
};
