const authRouter = require("express").Router();

const { register, login } = require("../controller/auth");

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);

module.exports = authRouter;
