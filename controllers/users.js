const mongoose = require("mongoose");
const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: `Ошибка валидации: ${err.message}` });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: `Ошибка валидации: ${err.message}` });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.getUserById = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    res.status(404).send({ message: "Пользователь не найден" });
  } else {
    User.findById(req.params.userId)
      .then((user) => {
        res.send({ data: user });
      })
      .catch(() => {
        res.status(500).send({ message: "Произошла ошибка" });
      });
  }
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
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: `Ошибка валидации: ${err.message}` });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
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
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: `Ошибка валидации: ${err.message}` });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};
