exports.up = function (knex, Promise) {
    return knex.schema.createTable("skills", function (table) {
        table.increments("id").primary();
        table
            .integer("user_id")
            .references("id")
            .inTable("users")
            .notNull()
            .onDelete("cascade");
        table.string("skill");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("skills");
};
