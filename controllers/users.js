const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      res.send({ data: user });
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

// router.get("/", (req, res) => {
//   User.find({})
//     .then((user) => res.send({ data: user }))
//     .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
// });

// router.get("/", (req, res) => {
//   User.find({})
//     .then((user) => res.send({ data: user }))
//     .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
// });

// router.post("/", (req, res) => {
//   const { name, about, avatar } = req.body;

// });
