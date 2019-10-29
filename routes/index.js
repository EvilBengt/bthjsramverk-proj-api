const express = require("express");
const router = express.Router();

const trading = require("./trading");
const users = require("./users");

router.use("/trading/", trading);

router.use("/users/", users)

module.exports = router;
