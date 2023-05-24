const router = require("express").Router();
const { login, dashboard } = require("../controller/controller.js");

router.route("/dashboard").get(dashboard);
router.route("/login").post(login);

module.exports = router;
