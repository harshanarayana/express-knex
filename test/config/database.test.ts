"use strict";

import {getTracker} from "mock-knex";
import {expect} from "chai";
import {describe, it} from "mocha";

import Database from "../../config/database";

const tracker = getTracker();

describe("Database Object Should be Mocked when ENV is TEST", () => {
    tracker.install();

    describe("When calling getInstance", () => {
        it("should return a singleton object", () => {
            expect(Database.getInstance()).to.be.equal(Database.getInstance());
        });
    });

    describe("When calling getInstance after object is constructed", () => {
        it("should return me a Database Object", () => {
            expect(Database.getInstance()).to.be.instanceOf(Database);
        });
    });

    describe("When calling getKnex after object is constructed", () => {
        it("should return a Knex Object", () => {
            expect(Database.getInstance().getKnex()).to.be.not.null;
        });
    });

    describe("When calling getBookshelf after object is constructed", () => {
        it("should return a Bookshelf Object", () => {
            expect(Database.getInstance().getBookshelf()).to.be.not.null;
        });
    });
});
