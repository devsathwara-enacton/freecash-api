import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable("offerwall_networks")
    .addColumn("id", "bigint", (col) => col.primaryKey().autoIncrement().notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("code", "text", (col) => col.notNull())
    .addColumn("logo", "text")
    .addColumn("type", sql<any>`enum`, (col) => col.notNull())
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("config_params", "longtext")
    .addColumn("config_params", "text")
    .addColumn("postback_validation_key", "text")
    .addColumn("postback_key", "text")
    .addColumn("api_key", "text")
    .addColumn("app_id", "text")
    .addColumn("pub_id", "text")
    .addColumn("countries", "text")
    .addColumn("categories", "text")
    .addColumn("enabled", "boolean", (col) => col.defaultTo(sql<any>`1`))
    .addColumn("created_at", "timestamp")
    .addColumn("updated_at", "timestamp")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("offerwall_networks").execute();
}