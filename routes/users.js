const router = require("express").Router();
const { createUser, getUsers, getUserById, updateProfile } = require("../controllers/users");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:userId", getUserById);
router.patch ("/me", updateProfile);


module.exports = router;
