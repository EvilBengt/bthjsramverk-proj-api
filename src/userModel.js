const connection = require("./db");
const bcrypt = require("bcryptjs");
const jwtModel = require("./jwtModel");

const userModel = {
    login: (login, password, callback) => {
        connection.run((db) => {
            db.get(`SELECT password FROM users WHERE name = $login OR email = $login`, {
                $login: login
            }, (err, row) => {
                if (row && bcrypt.compareSync(password, row.password)) {
                    callback(jwtModel.sign(login));
                } else {
                    callback(false);
                }
            });
        });
    },
    register: (name, email, password, birthdate, callback) => {
        connection.run((db) => {
            db.run(`
                INSERT INTO users (name, email, password, birthdate)
                VALUES ($name, $email, $password, $birthdate)
            `, {
                $name: name,
                $email: email,
                $password: bcrypt.hashSync(password, 8),
                $birthdate: birthdate
            }, (err) => {
                if (err) {
                    callback(false);
                } else {
                    callback(true);
                }
            });
        });
    }
};

module.exports = userModel;
