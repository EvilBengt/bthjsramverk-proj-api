const express = require("express");
const jwtModel = require("../src/jwtModel");
const accountModel = require("../src/accountModel");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const email = jwtModel.getEmail(req.headers["x-access-token"]);
        const balance = await accountModel.getAccountBalance(email);
        const funds = await accountModel.getOwnedFunds(email);

        res.json({
            data: {
                balance: balance,
                funds: funds
            }
        });
    } catch {
        res.status(500).send();
    }
});

router.post("/deposit", async (req, res) => {
    try {
        await accountModel.deposit(
            req.body.amount,
            jwtModel.getEmail(req.headers["x-access-token"])
        );
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

router.post("/invest", async (req, res) => {
    try {
        await accountModel.invest(
            req.body.fund,
            req.body.amount,
            jwtModel.getEmail(req.headers["x-access-token"])
        );
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

router.post("/sell", async (req, res) => {
    try {
        await accountModel.sell(
            req.body.fund,
            req.body.amount,
            jwtModel.getEmail(req.headers["x-access-token"])
        );
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

module.exports = router;
