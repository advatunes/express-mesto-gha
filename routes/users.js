const userRouter = require("express").Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:userId", getUserById);
userRouter.patch("/me", updateProfile);
userRouter.patch("/me/avatar", updateAvatar);

module.exports = { userRouter };
