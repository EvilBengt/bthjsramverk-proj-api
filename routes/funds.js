const express = require("express");
const jwtModel = require("../src/jwtModel");
const fundsModel = require("../src/fundsModel");

const router = express.Router();

router.get("/weeks", (req, res) => {
    fundsModel.weeks((rows) => {
        res.json({
            data: {
                weeks: rows
            }
        });
    })
});

module.exports = router;
