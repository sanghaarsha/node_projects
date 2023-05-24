const express = require("express");
const router = express.Router();

const { loginHandler, dashboardHandler } = require("../controller/main");

const authMiddleware = require("../middlewares/auth");

router.route("/login").post(loginHandler);
router.route("/dashboard").get(authMiddleware, dashboardHandler);

module.exports = router;
