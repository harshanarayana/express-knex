exports.up = function (knex, Promise) {
    return knex.schema.createTable("users", function (table) {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("designation").notNullable();
        table.string("team_name").notNullable();
        table.string("organization_name").notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("skills").dropTable("users");
};
