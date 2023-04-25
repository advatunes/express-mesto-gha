const createUserRouter = require("express").Router();
const { createUser } = require("../controllers/users");

createUserRouter.post("/signup", createUser);

module.exports = { createUserRouter };
