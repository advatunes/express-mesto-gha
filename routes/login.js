const loginRouter = require("express").Router();
const { login } = require("../controllers/login");

loginRouter.post("/signin", login);

module.exports = { loginRouter };
