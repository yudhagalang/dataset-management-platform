import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Datasets extends BaseSchema {
  protected tableName = "datasets";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string("id").primary();
      table.string("name", 50).notNullable();
      table.string("file_path", 255).notNullable();
      table
        .string("user_id", 10)
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("task_id").references("id").inTable("tasks");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
