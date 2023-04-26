const express = require("express");
const router = express.Router();

import { GetRoutes } from "./routes/routes";
import { Authentication } from "./middlewares/authencation";
import middleware from "./middlewares/middleware";

for(let r of GetRoutes()) {
    router.use(middleware);
    if(r.Auth && r.Role) {
        router[r.method](r.URI, Authentication(r.Role), r.handler);
    } else {
        router[r.method](r.URI, r.handler);
    }
}

module.exports = router;