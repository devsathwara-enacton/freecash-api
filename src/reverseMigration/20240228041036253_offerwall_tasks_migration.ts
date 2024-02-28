import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("offerwall_tasks")
    .addColumn("id", "bigint", (col) =>
      col.primaryKey().autoIncrement().notNull()
    )
    .addColumn("network", "text", (col) => col.notNull())
    .addColumn("offer_id", "text", (col) => col.notNull())
    .addColumn("campaign_id", "text", (col) => col.notNull())
    .addColumn("category_id", "bigint", (col) =>
      col
        .notNull()
        .references("offerwall_categories.id")
        .onUpdate("cascade")
        .onDelete("no action")
    )
    .addColumn("name", sql<any>`longtext`, (col) => col.notNull())
    .addColumn("description", sql<any>`longtext`)
    .addColumn("instructions", sql<any>`longtext`)
    .addColumn("image", "text")
    .addColumn("url", "text", (col) => col.notNull())
    .addColumn("payout", "text", (col) =>
      col.notNull().defaultTo(sql<any>`0.00`)
    )
    .addColumn("countries", sql<any>`longtext`)
    .addColumn("devices", sql<any>`longtext`)
    .addColumn("platforms", sql<any>`longtext`)
    .addColumn("conversion_rate", "text")
    .addColumn("score", "text")
    .addColumn("daily_cap", "text")
    .addColumn("created_date", "text")
    .addColumn("start_date", "text")
    .addColumn("end_date", "text")
    .addColumn("offer_type", "text")
    .addColumn("network_categories", sql<any>`longtext`)
    .addColumn("network_goals", sql<any>`longtext`)
    .addColumn("redemptions", "integer", (col) =>
      col.notNull().defaultTo(sql<any>`0`)
    )
    .addColumn("clicks", "integer", (col) =>
      col.notNull().defaultTo(sql<any>`0`)
    )
    .addColumn("status", sql<any>`enum('publish','draft','trash')`, (col) =>
      col.defaultTo(sql<any>`'publish'`)
    )
    .addColumn("is_translated", "boolean", (col) =>
      col.notNull().defaultTo(sql<any>`0`)
    )
    .addColumn("is_featured", "boolean", (col) =>
      col.notNull().defaultTo(sql<any>`0`)
    )
    .addColumn("goals_count", "integer", (col) =>
      col.notNull().defaultTo(sql<any>`1`)
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("offerwall_tasks").execute();
}
