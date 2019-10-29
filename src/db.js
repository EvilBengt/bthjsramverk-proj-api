const path = require("path");
const Database = require("sqlite-async");

let instance = undefined;

const db = {
    init: async () => {
        instance = await Database.open(path.join(__dirname,"../db/db.sqlite"));
    },
    instance: () => instance,
    close: () => {
        instance.close();
    }
};

module.exports = db;
