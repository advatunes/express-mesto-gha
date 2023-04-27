const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

const STATUS_NOT_FOUND = require("../utils/errors");
const STATUS_BAD_REQUEST = require("../utils/errors");
const STATUS_CREATED = require("../utils/errors");
const STATUS_INTERNAL_SERVER_ERROR = require("../utils/errors");
const STATUS_INVALID_CREDENTIALS = require("../utils/errors");
const STATUS_DUPLICATE_EMAIL = require("../utils/errors");
const STATUS_UNAUTHORIZED_ACTION = require("../utils/errors");

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", { expiresIn: "7d" });
      res.send({ token });
    })
    .catch((err) => {
      throw new STATUS_INVALID_CREDENTIALS();
    }).catch(next);
};
