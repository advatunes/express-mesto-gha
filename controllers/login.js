const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config");

const { STATUS_INVALID_CREDENTIALS } = require("../utils/errors");

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next);
};
