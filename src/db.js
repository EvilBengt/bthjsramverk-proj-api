const dbAccess = require("../db/database");

const db = {
    run: (callback) => {
        const connection = dbAccess.get();

        const result = callback(connection)

        connection.close();

        return result;
    }
}

module.exports = db;
