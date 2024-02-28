import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable("user_tasks")
    .addColumn("id", "bigint", (col) => col.primaryKey().autoIncrement().notNull())
    .addColumn("network", "text", (col) => col.notNull())
    .addColumn("task_offer_id", "text")
    .addColumn("offer_id", "text", (col) => col.notNull())
    .addColumn("transaction_id", "text", (col) => col.notNull())
    .addColumn("user_id", "bigint", (col) => col.notNull())
    .addColumn("task_name", "text", (col) => col.notNull())
    .addColumn("task_type", "text", (col) => col.notNull())
    .addColumn("amount", "text", (col) => col.notNull())
    .addColumn("payout", "text", (col) => col.notNull())
.addColumn("status", sql<any>`enum('pending','confirmed','declined')`, (col) => col.notNull().defaultTo(sql<any>`'pending'`))
    .addColumn("mail_sent", "boolean", (col) => col.notNull().defaultTo(sql<any>`0`))
    .addColumn("extra_info", "text")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql<any>`CURRENT_TIMESTAMP`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql<any>`CURRENT_TIMESTAMP`))
    .addColumn("network_goal_id", "text")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("user_tasks").execute();
}