var db = process.env.NODE_ENV === "test" ? "bookshelf_test" : "bookshelf";

module.exports = {
  client: "sqlite3",
  connection: {
    filename: "./nts-interview.db"
  },
  migrations: {
    tableName: "knex_migrations"
  },
  useNullAsDefault: true
};
