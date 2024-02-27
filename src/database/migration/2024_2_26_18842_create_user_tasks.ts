import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("task_entries")
    .addColumn("id", "bigint", (col) =>
      col.unsigned().autoIncrement().primaryKey()
    )
    .addColumn("network", "char(50)", (col) => col.notNull())
    .addColumn("task_offer_id", "char(50)", (col) => col.notNull())
    .addColumn("offer_id", "char(50)", (col) => col.notNull())
    .addColumn("transaction_id", "char(50)", (col) => col.notNull())
    .addColumn("user_id", "bigint", (col) => col.unsigned().notNull())
    .addColumn("task_name", "varchar(255)", (col) => col.notNull())
    .addColumn("task_type", "char(10)", (col) => col.notNull())
    .addColumn("amount", "decimal", (col) => col.notNull())
    .addColumn("payout", "decimal", (col) => col.notNull())
    .addColumn("status", "varchar", (col) => col.notNull().defaultTo("pending"))
    .addColumn("mail_sent", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("extra_info", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .addColumn("network_goal_id", "varchar(255)", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("task_entries").execute();
}
