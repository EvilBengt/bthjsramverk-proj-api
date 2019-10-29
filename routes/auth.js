const express = require("express");
const authModel = require("../src/authModel");

const router = express.Router();

router.post("/login", (req, res) => {
    authModel.login(req.body.email, req.body.password, (token) => {
        if (token) {
            res.json({
                data: {
                    token: token
                }
            });
        } else {
            res.status(401).send();
        }
    })
});

router.post("/register", (req, res) => {
    authModel.register(req.body.email, req.body.password, (success) => {
        if (success) {
            res.status(201).send();
        } else {
            res.status(500).send();
        }
    });
});

module.exports = router;
