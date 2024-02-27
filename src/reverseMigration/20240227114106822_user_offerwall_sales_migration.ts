import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable("user_offerwall_sales")
    .addColumn("id", "bigint", (col) => col.primaryKey().autoIncrement().notNull())
    .addColumn("network", "text", (col) => col.notNull())
    .addColumn("transaction_id", "text", (col) => col.notNull())
    .addColumn("user_id", "bigint", (col) => col.notNull())
    .addColumn("task_offer_id", "text", (col) => col.notNull())
    .addColumn("network_goal_id", "text")
    .addColumn("offer_id", "text", (col) => col.notNull())
    .addColumn("task_name", "text", (col) => col.notNull())
    .addColumn("task_type", "text", (col) => col.notNull())
    .addColumn("amount", "text", (col) => col.notNull())
    .addColumn("payout", "text", (col) => col.notNull())
    .addColumn("status", sql<any>`enum`, (col) => col.notNull().defaultTo(sql<any>`'pending'`))
    .addColumn("status", "text", (col) => col.notNull().defaultTo(sql<any>`'pending'`))
    .addColumn("extra_info", "longtext")
    .addColumn("extra_info", "text")
    .addColumn("mail_sent", "boolean", (col) => col.notNull().defaultTo(sql<any>`0`))
    .addColumn("created_at", "timestamp")
    .addColumn("updated_at", "timestamp")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("user_offerwall_sales").execute();
}