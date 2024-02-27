import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable("user_task_clicks")
    .addColumn("id", "bigint", (col) => col.primaryKey().autoIncrement().notNull())
    .addColumn("user_id", "bigint", (col) => col.notNull())
    .addColumn("platform", "text", (col) => col.notNull())
    .addColumn("task_type", "text", (col) => col.notNull())
    .addColumn("network", "text", (col) => col.notNull())
    .addColumn("task_offer_id", "text")
    .addColumn("campaign_id", "text", (col) => col.notNull())
    .addColumn("clicked_on", "timestamp", (col) => col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`))
    .addColumn("countries", "text", (col) => col.notNull())
    .addColumn("locale", "text", (col) => col.notNull())
    .addColumn("Referer", "text", (col) => col.notNull())
    .addColumn("user_agent", "text", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("user_task_clicks").execute();
}