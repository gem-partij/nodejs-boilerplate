var express = require("express");
var router = express.Router();

const checkRole = require("/middlewares/check_role");

/* GET users listing. */
router.get("/", checkRole(["admin"]), function (req, res, next) {
	res.send("respond with a resource");
});

module.exports = router;
