import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("offerwall_networks")
    .addColumn("id", "bigint", (col) =>
      col.unsigned().autoIncrement().primaryKey()
    )
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("code", "char(50)", (col) => col.notNull())
    .addColumn("logo", "varchar(255)", (col) => col.notNull())
    .addColumn("type", "varchar", (col) => col.notNull())
    .addColumn("config_params", "text", (col) => col.notNull())
    .addColumn("postback_validation_key", "varchar(255)", (col) =>
      col.notNull()
    )
    .addColumn("postback_key", "varchar(255)", (col) => col.notNull())
    .addColumn("api_key", "varchar(255)", (col) => col.notNull())
    .addColumn("app_id", "varchar(255)", (col) => col.notNull())
    .addColumn("pub_id", "varchar(255)", (col) => col.notNull())
    .addColumn("countries", "varchar(255)", (col) => col.notNull())
    .addColumn("categories", "varchar(255)", (col) => col.notNull())
    .addColumn("enabled", "boolean", (col) => col.notNull().defaultTo(1))
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("offerwall_networks").execute();
}
