const router = require("express").Router();
const { login, dashboard } = require("../controller/controller.js");

const authMiddleware = require("../middlewares/auth.js");

router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
