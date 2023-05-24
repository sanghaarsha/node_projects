const express = require("express");
const router = express.Router();

const { loginHandler, dashboardHandler } = require("../controller/main");

router.route("/login").post(loginHandler);
router.route("/dashboard").get(dashboardHandler);

module.exports = router;
