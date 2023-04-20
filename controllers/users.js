const mongoose = require("mongoose");
const User = require("../models/user");
const {
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CREATED).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res
          .status(STATUS_BAD_REQUEST)
          .send({ message: `Ошибка валидации: ${err.message}` });
      } else {
        res
          .status(STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: "Произошла ошибка" });
      }
    });
};

module.exports.getUsers = (req, res) => {

  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Произошла ошибка" });
    });
};

module.exports.getUserById = (req, res) => {
  console.log(req);
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res
      .status(STATUS_BAD_REQUEST)
      .send({ message: "Некорректный ID пользователя" });
  }

  return User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(STATUS_NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      }
      return res.send({ data: user });
    })
    .catch(() => res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: "Произошла ошибка" }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res
          .status(STATUS_BAD_REQUEST)
          .send({ message: `Ошибка валидации: ${err.message}` });
      } else {
        res
          .status(STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: "Произошла ошибка" });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res
          .status(STATUS_BAD_REQUEST)
          .send({ message: `Ошибка валидации: ${err.message}` });
      } else {
        res
          .status(STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: "Произошла ошибка" });
      }
    });
};
