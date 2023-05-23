const router = require("express").Router();
const { getHandler } = require("../controller/controller.js");

router.route("/").get(getHandler);

module.exports = router;
