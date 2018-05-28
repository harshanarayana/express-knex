import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Response, Request } from "express";

import * as bodyParser from "body-parser";

import apiV1Routes from "./routes/apiV1";

const app = express();

const allowCrossDomain = function(req: Request, res: Response, next) {
  console.log(req.headers);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    console.log("HERE");
    res.send(200);
  } else {
    next();
  }
};
app.options("*", cors());
app.disable("etag");
app.use(cors());
app.use(allowCrossDomain);
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup Application
app.set("port", process.env.PORT || 5000);

app.use("/api/v1", apiV1Routes);

export default app;
