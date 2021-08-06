import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Tasks extends BaseSchema {
  protected tableName = "tasks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string("id").primary();
      table.string("name", 50).notNullable();
      table.integer("status");
      table
        .string("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
