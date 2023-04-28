const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const mongoose = require("mongoose");
const User = require("../models/user");

const {
  STATUS_NOT_FOUND,
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_INVALID_CREDENTIALS,
  STATUS_DUPLICATE_EMAIL,
  STATUS_UNAUTHORIZED_ACTION,
} = require("../utils/errors");

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  if (!validator.isEmail(email)) {
    throw new STATUS_BAD_REQUEST("Некорректный адрес электронной почты");
  }

  User.findOne({ email: email })
    .select("-password")
    .then((user) => {
      if (user) {
        throw new STATUS_DUPLICATE_EMAIL(
          "Пользователь с таким email уже существует"
        );
      }
      bcrypt.hash(password, 10).then((hash) => {
        User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        })
          .then((user) => res.status(201).send({ user }))
          .catch((err) => {
            console.log(err);
            if (err instanceof mongoose.Error.ValidationError) {
              next(new STATUS_BAD_REQUEST(`Ошибка валидации: ${err.message}`));
            } else if (err.code === 11000) {
              throw new STATUS_DUPLICATE_EMAIL(
                "Такой пользователь уже существует"
              );
            } else {
              next(new STATUS_INTERNAL_SERVER_ERROR("Произошла ошибка"));
            }
          });
      });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
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

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
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

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
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
