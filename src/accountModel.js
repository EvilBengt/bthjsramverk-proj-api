const db = require("./db");
const fundsModel = require("./fundsModel");

const accountModel = {
    getAccountBalance: async (email) => {
        return (await db.instance().get(`SELECT balance FROM users WHERE email = $email`, {
            $email: email
        })).balance;
    },
    getOwnedFunds: async (email) => {
        return await db.instance().all(`
            SELECT name,
                   long_name,
                   amount, value
              FROM user_funds
              LEFT JOIN funds
                ON user_funds.fund = funds.name
             WHERE user = $email
        `, {
            $email: email
        });
    },
    deposit: async (amount, email) => {
        await db.instance().run(`UPDATE users SET balance = balance + $amount WHERE email = $email`, {
            $amount: amount,
            $email: email
        });
    },
    invest: async (fundName, amount, email) => {
        const balance = await accountModel.getAccountBalance(email);
        const fundValue = (await db.instance().get(`
            SELECT value
              FROM funds
             WHERE name = $name
        `, {
            $name: fundName
        })).value;
        const totalCost = fundValue * amount;

        if (balance >= totalCost) {
            await db.instance().run(`
                INSERT INTO user_funds
                VALUES ($email, $fund, $amount)
                On CONFLICT(user, fund) DO UPDATE SET amount = amount + $amount
            `, {
                $email: email,
                $fund: fundName,
                $amount: amount
            });
            await accountModel.deposit(-totalCost, email);
        } else {
            throw new Error("Insufficient account balance.");
        }
    },
    sell: async (fundName, amount, email) => {
        const fundAmount = (await db.instance().get(`
            SELECT amount
            FROM user_funds
            WHERE user = $email
              AND fund = $fund
        `, {
            $email: email,
            $fund: fundName
        })).amount;

        if (fundAmount >= amount) {
            const fundValue = (await db.instance().get(`
                SELECT value
                FROM funds
                WHERE name = $name
            `, {
                $name: fundName
            })).value;
            const totalCost = fundValue * amount;

            if (fundAmount > amount) {
                await db.instance().run(`
                    UPDATE user_funds
                    SET amount = amount - $amount
                    WHERE user = $email
                      AND fund = $fund
                `, {
                    $amount: amount,
                    $email: email,
                    $fund: fundName
                });
            } else if (fundAmount == amount) {
                await db.instance().run(`
                    DELETE FROM user_funds
                     WHERE user = $email
                       AND fund = $fund
                `, {
                    $email: email,
                    $fund: fundName
                });
            }
            await accountModel.deposit(totalCost, email);
        }
    }
};

module.exports = accountModel;
