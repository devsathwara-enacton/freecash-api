import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable("settings")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement().notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("val", "text")
    .addColumn("created_at", "timestamp")
    .addColumn("updated_at", "timestamp")
    .addColumn("group", "text", (col) => col.notNull().defaultTo(sql<any>`'default'`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("settings").execute();
}