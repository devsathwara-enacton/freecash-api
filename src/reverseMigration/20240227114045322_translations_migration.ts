import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable("translations")
    .addColumn("id", "bigint", (col) => col.primaryKey().autoIncrement().notNull())
    .addColumn("page", "text", (col) => col.notNull())
    .addColumn("module", "text")
    .addColumn("trans_key", "text", (col) => col.notNull())
    .addColumn("trans_value", "longtext")
    .addColumn("trans_value", "text")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("translations").execute();
}