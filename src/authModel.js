const db = require("./db")
const bcrypt = require("bcryptjs");
const jwtModel = require("./jwtModel");

const userModel = {
    login: async (email, password) => {
        const row = await db.instance().get(`SELECT password FROM users WHERE email = $email`, {
            $email: email
        });

        if (row && bcrypt.compareSync(password, row.password)) {
            return jwtModel.sign(email);
        } else {
            return false;
        }
    },
    register: async (email, password) => {
        await db.instance().run(`
            INSERT INTO users (email, password)
            VALUES ($email, $password)
        `, {
            $email: email,
            $password: bcrypt.hashSync(password, 8),
        });
    }
};

module.exports = userModel;
