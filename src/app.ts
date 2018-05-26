import express from "express";
import morgan from "morgan";
import cors from "cors";

import * as bodyParser from "body-parser";

import apiV1Routes from "./routes/apiV1";

const app = express();

const allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // intercept OPTIONS method
    if ("OPTIONS" == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

app.disable("etag");
app.use(cors());
app.use(allowCrossDomain);
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Setup Application
app.set("port", process.env.PORT || 3032);

app.use("/api/v1", apiV1Routes);

export default app;
