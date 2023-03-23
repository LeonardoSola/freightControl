const Express = require("express");
const app = Express();
const router = require("./router/router");

app.use(Express.json());
app.use(router);

app.listen(80, () => console.log("Server running on port 80"));