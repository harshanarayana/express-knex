import Database from "../../config/database";
import Skills from "./skills";
import {Collection} from "bookshelf";

const db = Database.getInstance();
const bookshelf = db.getBookshelf();

/**
 * ORM Representation of the "users" table that acts as a primary
 * data provider for the "skills" table.
 *
 * Any user in this table can have one or more skills that are
 * stored in the "skills" table through the reference of "user_id"
 */
export default class User extends bookshelf.Model<User> {
    /**
     * return table name for the given Data model. This will be
     * used by Bookshelf and Knex to generate the queries by
     * transforming the ORM
     *
     * @returns {@type string}
     */
    get tableName(): string {
        return "users";
    }

    /**
     * If the given table has Timestamp fields for housekeeping.
     *
     * @returns {@type boolean}
     */
    get hasTimestamps(): boolean {
        return false;
    }

    /**
     * Relational reference that informs the ORM system that this
     * entity has a relation to the {@link User} model defined on
     * the "users" table.
     *
     * @returns {@link Collection<Skills>}
     */
    skills(): Collection<Skills> {
        return this.hasMany(Skills, "user_id");
    }
}
