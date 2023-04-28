const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

const STATUS_INVALID_CREDENTIALS = require("../utils/errors");

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", { expiresIn: "7d" });
      res.send({ token });
    })
    .catch((err) => {
      throw new STATUS_INVALID_CREDENTIALS("Неверный логин или пароль");
    }).catch(next);
};
