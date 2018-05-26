exports.up = function (knex, Promise) {
    return knex.schema.alterTable("skills", function (table) {
        table
            .integer("rating")
            .notNullable()
            .defaultTo(0);
    });
};

exports.down = function (knex, Promise) {
    table.schema.alterTable("skills", function (table) {
        table.dropColumn("rating");
    });
};
