const db = require("./db").instance();
const fundsModel = require("./fundsModel");

const accountModel = {
    getAccountBalance: async (email) => {
        return await db.get(`SELECT balance FROM users WHERE email = $email`, {
            $email: email
        });
    },
    getOwnedFunds: async (email) => {
        return await db.all(`SELECT fund, amount FROM user_funds WHERE email = $email`, {
            $email: email
        });
    },
    deposit: async (amount, email) => {
        await db.run(`UPDATE users SET balance = balance + $amount WHERE email = $email`, {
            $amount: amount,
            $email: email
        });
    },
    invest: async (fundName, amount, email) => {
        const balance = await accountModel.getAccountBalance(email);
        const fundValue = await fundsModel.getValue(fundName);
        const totalCost = fundValue * amount;

        if (balance >= totalCost) {
            await db.run(`
                INSERT INTO user_funds
                VALUES ($email, $fund, $amount)
                On CONFLICT(user, fund) DO UPDATE SET amount = amount + $amount
            `, {
                $email: email,
                $fund: fundName,
                $amount: amount
            });
        } else {
            throw new Error("Insufficient account balance.");
        }
    },
    sell: async (fundName, amount, email) => {
        const fundAmount = db.get(`
            SELECT amount
            FROM user_funds
            WHERE user = $email
              AND fund = $fund
        `, {
            $email: email,
            $fund: fundName
        }).amount;

        if (fundAmount >= amount) {
            db.run(`
                UPDATE user_funds
                SET amount = amount - $amount
                WHERE user = $email
                  AND fund = $fund
            `, {
                $amount: amount,
                $fund: fundName
            });
        }
    }
};

module.exports = accountModel;
