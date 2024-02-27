import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("settings")
    .addColumn("id", "integer", (col) =>
      col.unsigned().autoIncrement().primaryKey()
    )
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("val", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .addColumn("group", "varchar(255)", (col) =>
      col.notNull().defaultTo("default")
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("settings").execute();
}
