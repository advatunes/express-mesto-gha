const jwt = require("jsonwebtoken");
const User = require("../models/user");

const {
  STATUS_INVALID_CREDENTIALS,
} = require("../utils/errors");

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", { expiresIn: "7d" });
      res.send({ token });
    })
    .catch((err) => {
      console.log(err);
      throw new STATUS_INVALID_CREDENTIALS("Неверный адрес электронной почты или пароль");
    }).catch(next);
};
