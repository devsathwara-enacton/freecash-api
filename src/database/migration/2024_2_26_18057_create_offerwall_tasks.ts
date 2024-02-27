import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("offers")
    .addColumn("id", "bigint", (col) =>
      col.unsigned().autoIncrement().primaryKey()
    )
    .addColumn("network", "char(50)", (col) => col.notNull())
    .addColumn("offer_id", "varchar(255)", (col) => col.notNull())
    .addColumn("campaign_id", "varchar(255)", (col) => col.notNull())
    .addColumn("category_id", "bigint", (col) => col.unsigned().notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("instructions", "text", (col) => col.notNull())
    .addColumn("image", "varchar(255)", (col) => col.notNull())
    .addColumn("url", "varchar(2500)", (col) => col.notNull())
    .addColumn("payout", "decimal", (col) => col.defaultTo(sql<any>`0.00`))
    .addColumn("countries", "text", (col) => col.notNull())
    .addColumn("devices", "text", (col) => col.notNull())
    .addColumn("platforms", "text", (col) => col.notNull())
    .addColumn("conversion_rate", "decimal", (col) => col.notNull())
    .addColumn("score", "decimal", (col) => col.notNull())
    .addColumn("daily_cap", "decimal", (col) => col.notNull())
    .addColumn("created_date", "datetime", (col) => col.notNull())
    .addColumn("start_date", "datetime", (col) => col.notNull())
    .addColumn("end_date", "datetime", (col) => col.notNull())
    .addColumn("offer_type", "varchar(255)", (col) => col.notNull())
    .addColumn("network_categories", "text", (col) => col.notNull())
    .addColumn("network_goals", "text", (col) => col.notNull())
    .addColumn("redemptions", "integer", (col) =>
      col
        .unsigned()
        .notNull()
        .defaultTo(sql<any>`0`)
    )
    .addColumn("clicks", "integer", (col) =>
      col
        .unsigned()
        .notNull()
        .defaultTo(sql<any>`0`)
    )
    .addColumn("status", sql<any>`ENUM('publish', 'draft', 'trash')`, (col) =>
      col.notNull().defaultTo(sql<any>`'publish'`)
    )
    .addColumn("is_translated", "boolean", (col) =>
      col.notNull().defaultTo(sql<any>`0`)
    )
    .addColumn("is_featured", "boolean", (col) =>
      col.notNull().defaultTo(sql<any>`0`)
    )
    .addColumn("goals_count", "integer", (col) =>
      col
        .unsigned()
        .notNull()
        .defaultTo(sql<any>`1`)
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("offers").execute();
}
