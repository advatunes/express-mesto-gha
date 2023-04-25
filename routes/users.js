const userRouter = require("express").Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

userRouter.post("/signup", createUser);
userRouter.get("/users", getUsers);
userRouter.get("/users/:userId", getUserById);
userRouter.patch("/users/me", updateProfile);
userRouter.patch("/users/me/avatar", updateAvatar);

module.exports = { userRouter };
