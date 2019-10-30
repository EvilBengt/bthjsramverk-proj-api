const express = require("express");
const authModel = require("../src/authModel");

const router = express.Router();

router.post("/login", async (req, res) => {
    const token = await authModel.login(req.body.email, req.body.password);

    if (token) {
        res.json({
            data: {
                token: token
            }
        });
    } else {
        res.status(401).send();
    }
});

router.post("/register", (req, res) => {
    try {
        authModel.register(req.body.email, req.body.password);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

module.exports = router;
