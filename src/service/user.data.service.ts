"use strict";

import User from "../model/user";
import Skills from "../model/skills";
import CreateUserRequest from "../model/create-user-request";
import {Response} from "express";

export const getUserByEmail = (email: string) => {
    return User.where<User>({email: email})
        .fetchAll({
            withRelated: ["skills"]
        })
        .then(users => {
            return users.toJSON();
        });
};

export const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        new User()
            .fetchAll({
                withRelated: ["skills"]
            })
            .then(users => {
                resolve(users.toJSON());
            });
    });
};

export const createUser = (request: CreateUserRequest, res: Response) => {
    let id = undefined;
    return new User({
        name: request.name,
        email: request.email,
        designation: request.designation,
        team_name: request.teamName,
        organization_name: request.orgName
    })
        .save(undefined, {method: "insert"})
        .then(user => {
            id = user.id;
            request.skills.forEach((skill) => {
                new Skills({
                    user_id: user.id,
                    skill: skill.skill,
                    rating: skill.rating
                })
                    .save(undefined, {method: "insert"})
                    .then(skill => skill.toJSON());
            });
        })
        .then(() => {
            getUserById(id)
                .then(data => res.json(data))
                .catch(error => res.json(error));
        });
};

export const getUserById = (id: number) => {
    return User.where<User>({id: id})
        .fetch({withRelated: ["skills"]})
        .then(user => user.toJSON());
};
