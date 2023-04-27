const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const mongoose = require("mongoose");
const User = require("../models/user");

const STATUS_NOT_FOUND = require("../utils/errors");
const STATUS_BAD_REQUEST = require("../utils/errors");
const STATUS_CREATED = require("../utils/errors");
const STATUS_INTERNAL_SERVER_ERROR = require("../utils/errors");
const STATUS_INVALID_CREDENTIALS = require("../utils/errors");
const STATUS_DUPLICATE_EMAIL = require("../utils/errors");
const STATUS_UNAUTHORIZED_ACTION = require("../utils/errors");

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!validator.isEmail(email)) {
    throw new STATUS_BAD_REQUEST("Некорректный адрес электронной почты");
  }

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(STATUS_CREATED).send({ user }))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          throw new STATUS_BAD_REQUEST(`Ошибка валидации: ${err.message}`);
        } else {
          res
            .status(STATUS_INTERNAL_SERVER_ERROR)
            .send({ message: "Произошла ошибка" });
        }
      });
  });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUserById = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    throw new STATUS_BAD_REQUEST("Некорректный ID пользователя");
  }

  return User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new STATUS_NOT_FOUND("Пользователь не найден");
      }
      return res.send({ data: user });
    })
    .catch(next);
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
        throw new STATUS_BAD_REQUEST(`Ошибка валидации: ${err.message}`);
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
        throw new STATUS_BAD_REQUEST(`Ошибка валидации: ${err.message}`);
      } else {
        res
          .status(STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: "Произошла ошибка" });
      }
    });
};
