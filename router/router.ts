const express = require("express");
const router = express.Router();

import { GetRoutes } from "./routes/routes";
import { Authentication } from "./middlewares/authencation";
import { Request, Response } from "express";
import db from "../database/database";


for(let r of GetRoutes()) {
    if(r.Auth) {
        router[r.method](r.URI, Authentication, r.handler);
    } else {
        router[r.method](r.URI, r.handler);
    }
}

module.exports = router;