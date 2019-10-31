const express = require("express");
const morgan = require("morgan");
const fundsModel = require("./src/fundsModel");
const db = require("./src/db");

const app = express();

const UPDATE_INTERVAL = 5000;

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.origins([
    "https://proj-app.jsramverk.evilbengt.me:443",
    "http://localhost:3000",
    "http://192.168.2.163:3000"
]);

setInterval(async () => {
    const funds = await fundsModel.updateAndGetValues();

    io.emit("fundUpdate", funds);
}, UPDATE_INTERVAL)

db.init().then(() => {
    server.listen(8400);
});
