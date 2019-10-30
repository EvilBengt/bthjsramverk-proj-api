const express = require("express");
const jwtModel = require("../src/jwtModel");
const router = express.Router();

const funds = require("./funds");
const account = require("./account");
const auth = require("./auth");

router.use("/funds/", funds);

router.use("/account/", jwtModel.test, account);

router.use("/auth/", auth)

module.exports = router;
