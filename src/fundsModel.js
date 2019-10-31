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
    getValue: async (fundName) => {
        return await db.get(`SELECT value FROM funds WHERE name = $name`, {
            $name: fundName
        });
    }
};

module.exports = fundsModel;
