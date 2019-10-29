const express = require("express");
const jwtModel = require("../src/jwtModel");
const tradingModel = require("../src/tradingModel");

const router = express.Router();

router.get("/weeks", (req, res) => {
    tradingModel.weeks((rows) => {
        res.json({
            data: {
                weeks: rows
            }
        });
    })
});

module.exports = router;
