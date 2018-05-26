import {getTracker} from "mock-knex";
import {expect} from "chai";
import {describe, it} from "mocha";
import * as userDAO from "../../src/service/user.data.service";

const tracker = getTracker();

describe("User Data Access Service", () => {
    tracker.install();
    describe("When getUserByEmail is invoked", () => {
        before(() => {
            tracker.on("query", query => {
                const results = [
                    {
                        id: 1,
                        name: "test",
                        email: "test@email.com",
                        designation: "SSE",
                        team_name: "Some Team",
                        organization_name: "Some Org"
                    }
                ];
                query.response(results);
            });
        });
        it("should return 1 User", () => {
            userDAO.getUserByEmail("test@email.com").then(res => {
                expect(res).to.have.property("length", 1);
            });
        });
    });

    describe("When getAllUsers is invoked for success scenario", () => {
        before(() => {
            tracker.on("query", query => {
                const results = [
                    {
                        id: 1,
                        name: "test",
                        email: "test@email.com",
                        designation: "SSE",
                        team_name: "Some Team",
                        organization_name: "Some Org",
                        skills: [
                            {
                                skill: "JAVA",
                                rating: 10
                            }
                        ]
                    }
                ];
                query.response(results);
            });
        });
        it("should return 1 User", () => {
            userDAO.getAllUsers().then(res => {
                expect(res).to.have.property("length", 1);
            });
        });
    });

    describe("When getAllUsers is invoked for failure scenario", () => {
        before(() => {
            tracker.on("query", query => {
                query.reject("Failed");
            });
        });
        it("should reject the query promise", () => {
            userDAO.getAllUsers().catch(error => {
                expect(error).to.be.equal("Failed");
            });
        });
    });

    describe("When getUserById is invoked", () => {
        before(() => {
            tracker.on("query", query => {
                const result = [
                    {
                        id: 1,
                        name: "test",
                        email: "test@email.com",
                        designation: "SSE",
                        team_name: "Some Team",
                        organization_name: "Some Org",
                        skills: [
                            {
                                skill: "JAVA",
                                rating: 10
                            }
                        ]
                    }
                ];
                query.response(result);
            });
        });
        it("should return 1 User", () => {
            userDAO.getUserById(123).then(res => {
                expect(res).to.have.property("email", "test@email.com");
            });
        });
    });

    describe("When getUserById is invoked for failure scenario", () => {
        before(() => {
            tracker.on("query", query => {
                query.reject("Failed");
            });
        });
        it("should reject the query promise", () => {
            userDAO.getUserById(134).catch(error => {
                expect(error).to.be.equal("Failed");
            });
        });
    });

    describe("When createUser is Invoked", () => {
        before(() => {
            tracker.on("query", event => {
                event.response([
                    {
                        id: 10,
                        name: "TEST",
                        email: "test@email.com",
                        designation: "dt",
                        orgName: "o",
                        teamName: "tn",
                        skills: [
                            {
                                id: 1,
                                rating: 10,
                                skill: "JAVA"
                            }
                        ]
                    }
                ]);
            });
        });
        it("should save the user", () => {
            userDAO
                .createUser({
                    name: "TEST",
                    email: "test@email.com",
                    designation: "dt",
                    orgName: "o",
                    teamName: "tn",
                    skills: [
                        {
                            rating: 10,
                            skill: "JAVA"
                        }
                    ]
                })
                .then(res => {
                    console.log(res);
                    expect(res).to.be.not.null;
                });
        });
    });
});
