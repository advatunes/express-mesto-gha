const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "super-strong-secret", { expiresIn: "7d" });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
