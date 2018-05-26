"use strict";

import logger from "../../util/logger";
import * as userDataService from "../service/user.data.service";
import * as timeSeriesDataService from "../service/time.data.service";

import {Response, Request} from "express";

export let getApi = (req: Request, res: Response) => {
    logger.debug("API Invoked");
    res.json({
        message: "Hello, World!"
    });
};

export let getAllUsers = (req: Request, res: Response) => {
    logger.debug("Fetching User List");
    userDataService
        .getAllUsers()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(error);
        });
};

export let createUser = (req: Request, res: Response) => {
    userDataService
        .createUser({
            name: req.body.name,
            email: req.body.email,
            designation: req.body.designation,
            teamName: req.body.teamName,
            orgName: req.body.orgName,
            skills: req.body.skills
        }, res);
};

export let getUser = (req: Request, res: Response) => {
    userDataService
        .getUserByEmail(req.params.email)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(error);
        });
};

export let getUserById = (req: Request, res: Response) => {
    userDataService
        .getUserById(req.params.id)
        .then(data => res.json(data))
        .catch(error => res.json(error));
};


export let getTimeSeriesData = (req: Request, res: Response) => {
    timeSeriesDataService
        .getTimeSeriesData()
        .then(data => res.json(data))
        .catch(error => res.json(error));
};