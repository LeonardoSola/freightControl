const Express = require("express");
const app = Express();
const router = require("./router/router");
require("dotenv").config();

var port: number = Number(process.env.PORT) || 8080;

app.use(Express.json());
app.use(router);

// Database
require("./database/database").Test();
// Migrations
require("./migration/migration").Migrate();

app.listen(port,
    () => console.log("Server: ✅ | Port: "+ port)
).on("error", (e:any) => {
    console.log("Server: ❌ | Port: "+ port);
    console.log(e);
});