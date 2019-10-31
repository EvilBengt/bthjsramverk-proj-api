const express = require("express");
const fundsModel = require("../src/fundsModel");

const router = express.Router();

router.get("/all", async (req, res) => {
    res.json({
        data: {
            funds: await fundsModel.getAll()
        }
    });
});

router.get("/fund/:name", async (req, res) => {
    res.json({
        data: {
            fund: await fundsModel.get(req.params["name"])
        }
    });
});

module.exports = router;
