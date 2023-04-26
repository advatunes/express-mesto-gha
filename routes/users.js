const userRouter = require("express").Router();
const {

  getUsers,
  getUserInfo,
  getUserById,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");


userRouter.get("/users", getUsers);
userRouter.get("/users/me", getUserInfo);
userRouter.get("/users/:userId", getUserById);
userRouter.patch("/users/me", updateProfile);
userRouter.patch("/users/me/avatar", updateAvatar);

module.exports = { userRouter };
