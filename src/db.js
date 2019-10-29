const Database = require("sqlite-async");
const DSN = "../db/db.sqlite";

let instance = undefined;

const db = {
    init: async () => {
        instance = await Database.open(DSN);
    },
    instance: () => instance,
    close: () => {
        instance.close();
    }
};

module.exports = db;
