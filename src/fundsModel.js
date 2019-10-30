const db = require("./db");

const fundsModel = {
    getAll: async () => {
        return await db.instance().all(`SELECT name, long_name FROM funds`);
    },
    getValue: async (fundName) => {
        return await db.get(`SELECT value FROM funds WHERE name = $name`, {
            $name: fundName
        });
    }
};

module.exports = fundsModel;
