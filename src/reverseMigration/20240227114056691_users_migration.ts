import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable("users")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement().notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull())
    .addColumn("password", "text")
    .addColumn("googleId", "text")
    .addColumn("facebookId", "text")
    .addColumn("is_verified", "boolean", (col) => col.defaultTo(sql<any>`0`))
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql<any>`CURRENT_TIMESTAMP`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql<any>`CURRENT_TIMESTAMP`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("users").execute();
}