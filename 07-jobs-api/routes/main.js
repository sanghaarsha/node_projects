const router = require("express").Router();

const testController = require("../controller/main");

router.route("/testRoute").get(testController);

module.exports = router;
