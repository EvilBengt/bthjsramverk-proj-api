const express = require("express");
const jwtModel = require("../src/jwtModel");
const accountModel = require("../src/accountModel");

const router = express.Router();

router.get("/", async (req, res) => {
    const email = jwtModel.getEmail(req.headers["x-access-token"]);
    const balance = await accountModel.getAccountBalance(email);
    const funds = await accountModel.getOwnedFunds(email);

    res.json({
        data: {
            balance: balance,
            funds: funds
        }
    });
});

router.post("/deposit", async (req, res) => {
    await accountModel.deposit(
        req.body.amount,
        jwtModel.getEmail(req.headers["x-access-token"])
    );
    res.status(201).send();
});

router.post("/invest", async (req, res) => {
    await accountModel.invest(
        req.body.fundName,
        req.body.amount,
        jwtModel.getEmail(req.headers["x-access-token"])
    );
    res.status(201).send();
});

router.post("/sell", async (req, res) => {
    await accountModel.sell(
        req.body.fundName,
        req.body.amount,
        jwtModel.getEmail(req.headers["x-access-token"])
    );
    res.status(201).send();
});

module.exports = router;
