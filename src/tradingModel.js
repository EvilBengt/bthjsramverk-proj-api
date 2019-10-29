const connection = require("./db");

const tradingModel = {
    getAccountBalance: (email, callback) => {
        connection.run((db) => {
            db.get(`SELECT balance FROM users WHERE email = $email`, {
                $email: email
            }, (err, row) => {
                callback(row);
            });
        });
    },
};

module.exports = tradingModel;
