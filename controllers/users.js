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

  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: `Ошибка валидации: ${err.message}` });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.updateProfile = (req, res) => {

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
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: `Ошибка валидации: ${err.message}` });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};
