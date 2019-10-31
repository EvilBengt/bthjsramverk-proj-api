const db = require("./db");

const fundsModel = {
    getAll: async () => {
        return await db.instance().all(`SELECT name, long_name FROM funds`);
    },
    get: async name => {
        return await db.instance().get(`
            SELECT name, long_name,
                   value,
                   rate, variance
              FROM funds
             WHERE name = $name
        `, {
            $name: name
        });
    },
    updateAndGetValues: async () => {
        const funds = await db.instance().all(`
            SELECT name,
                   value,
                   rate, variance
              FROM funds
        `);
        const updated = funds.map(fund => {
            return {
                name: fund.name,
                value: fund.value * fund.rate + fund.variance * (Math.random() > 0.5 ? 1 : -1)
            };
        });

        updated.forEach(async fund => {
            await db.instance().run(`
                UPDATE funds
                SET value = $newValue
                WHERE name = $name
            `, {
                $newValue: fund.value,
                $name: fund.name
            });
        });

        return updated;
    }
};

module.exports = fundsModel;
