import express from "express";

import * as apiController from "../controller/api";
import fastCheck from "../service/auth.service";

export const apiV1Routes = express.Router();

apiV1Routes
  .get("", apiController.getApi)
  .get("/users", fastCheck, apiController.getAllUsers)
  .get("/users/email/:email", fastCheck, apiController.getUser)
  .get("/users/id/:id", fastCheck, apiController.getUserById)
  .post("/users", fastCheck, apiController.createUser)
  .get("/time", fastCheck, apiController.getTimeSeriesData);

export default apiV1Routes;
