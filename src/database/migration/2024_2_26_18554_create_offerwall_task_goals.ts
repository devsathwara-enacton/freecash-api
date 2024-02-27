import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("offerwall_task_goals")
    .addColumn("id", "bigint", (col) =>
      col.unsigned().autoIncrement().primaryKey()
    )
    .addColumn("network", "char(50)", (col) => col.notNull())
    .addColumn("task_offer_id", "varchar(255)", (col) => col.notNull())
    .addColumn("network_task_id", "varchar(255)", (col) => col.notNull())
    .addColumn("network_goal_id", "varchar(255)", (col) => col.notNull())
    .addColumn("network_goal_name", "varchar(255)", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("image", "varchar(255)", (col) => col.notNull())
    .addColumn("cashback", "decimal", (col) => col.notNull().defaultTo("0.00"))
    .addColumn("revenue", "decimal", (col) => col.notNull().defaultTo("0.00"))
    .addColumn("status", "varchar", (col) => col.notNull().defaultTo("publish"))
    .addColumn("is_translated", "boolean", (col) =>
      col.notNull().defaultTo(false)
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
  await db.schema.dropTable("offerwall_task_goals").execute();
}
