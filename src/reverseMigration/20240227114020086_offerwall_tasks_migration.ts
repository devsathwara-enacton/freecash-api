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
    .addColumn("category_id", "bigint", (col) => col.notNull())
    .addColumn("name", sql<any>`longtext`, (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("description", sql<any>`longtext`)
    .addColumn("description", "text")
    .addColumn("instructions", sql<any>`longtext`)
    .addColumn("instructions", "text")
    .addColumn("image", "text")
    .addColumn("url", "text", (col) => col.notNull())
    .addColumn("payout", "text", (col) =>
      col.notNull().defaultTo(sql<any>`0.00`)
    )
    .addColumn("countries", sql<any>`longtext`)
    .addColumn("countries", "text")
    .addColumn("devices", sql<any>`longtext`)
    .addColumn("devices", "text")
    .addColumn("platforms", sql<any>`longtext`)
    .addColumn("platforms", "text")
    .addColumn("conversion_rate", "text")
    .addColumn("score", "text")
    .addColumn("daily_cap", "text")
    .addColumn("created_date", "text")
    .addColumn("start_date", "text")
    .addColumn("end_date", "text")
    .addColumn("offer_type", "text")
    .addColumn("network_categories", sql<any>`longtext`)
    .addColumn("network_categories", "text")
    .addColumn("network_goals", sql<any>`longtext`)
    .addColumn("network_goals", "text")
    .addColumn("redemptions", "integer", (col) =>
      col.notNull().defaultTo(sql<any>`0`)
    )
    .addColumn("clicks", "integer", (col) =>
      col.notNull().defaultTo(sql<any>`0`)
    )
    .addColumn("status", sql<any>`enum`, (col) =>
      col.defaultTo(sql<any>`'publish'`)
    )
    .addColumn("status", "text", (col) => col.defaultTo(sql<any>`'publish'`))
    .addColumn("is_translated", "boolean", (col) =>
      col.notNull().defaultTo(sql<any>`0`)
    )
    .addColumn("is_featured", "boolean", (col) =>
      col.notNull().defaultTo(sql<any>`0`)
    )
    .addColumn("goals_count", "integer", (col) =>
      col.notNull().defaultTo(sql<any>`1`)
    )
    .addColumn("created_at", "timestamp")
    .addColumn("updated_at", "timestamp")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("offerwall_tasks").execute();
}
