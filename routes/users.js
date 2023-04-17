const router = require("express").Router();
const {createUser, getUsers, getUserById} = require("../controllers/users");

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

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);

module.exports = router;

