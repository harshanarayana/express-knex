import Knex from "knex";
import Bookshelf from "bookshelf";
import {mock} from "mock-knex";

export default class Database {
    private static _instance: Database;

    protected _knex: any = undefined;

    protected _bookshelf: any = undefined;

    private constructor() {
        this._knex = Knex({
            client: "sqlite3",
            debug: false,
            connection: {
                filename: "./nts-interview.db",
                debug: false
            },
            useNullAsDefault: true
        });

        if (process.env.NODE_ENV === "test") {
            mock(this._knex);
        }

        this._bookshelf = Bookshelf(this._knex);

        Database._instance = this;
    }

    public static getInstance(): Database {
        if (!Database._instance) {
            new Database();
        }
        return Database._instance;
    }

    public getKnex(): any {
        return this._knex;
    }

    public getBookshelf(): Bookshelf {
        return this._bookshelf;
    }
}
