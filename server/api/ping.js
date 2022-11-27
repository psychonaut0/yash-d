const { isOnline } = require("../controller/ping");


const router = require("express").Router();



router.route("/").get(isOnline)

module.exports = router