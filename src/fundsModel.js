const db = require("./db");

const fundsModel = {
    getValue: async (fundName) => {
        return await db.get(`SELECT value FROM funds WHERE name = $name`, {
            $name: fundName
        });
    }
};

module.exports = fundsModel;
