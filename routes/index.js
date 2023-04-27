const { userRouter } = require("./users");
const { cardRouter } = require("./cards");
const { loginRouter } = require("./login");
const { createUserRouter } = require("./createUser");

module.exports = {
  userRouter,
  cardRouter,
  loginRouter,
  createUserRouter,
};
