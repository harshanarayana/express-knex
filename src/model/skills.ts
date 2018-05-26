import Database from "../../config/database";
import User from "./user";

const db = Database.getInstance();
const bookshelf = db.getBookshelf();
/**
 * ORM model representing the "skills" table that has many to one relation
 * with the "users" table through the reference key "user_id"
 */
export default class Skills extends bookshelf.Model<Skills> {
    /**
     * return table name for the given Data model. This will be
     * used by Bookshelf and Knex to generate the queries by
     * transforming the ORM
     */
    get tableName(): string {
        return "skills";
    }

    /**
     * If the given table has Timestamp fields for housekeeping.
     */
    get hasTimestamps(): boolean {
        return false;
    }

    /**
     * Relational reference that informs the ORM system that this
     * entity has a relation to the {@link User} model defined on
     * the "users" table.
     */
    get user(): User {
        return this.belongsTo(User);
    }
}
