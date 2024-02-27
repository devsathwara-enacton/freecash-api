import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("offerwall_task_goals")
    .addColumn("id", "bigint", (col) =>
      col.primaryKey().autoIncrement().notNull()
    )
    .addColumn("network", "text", (col) => col.notNull())
    .addColumn("task_offer_id", "text", (col) => col.notNull())
    .addColumn("network_task_id", "text", (col) => col.notNull())
    .addColumn("network_goal_id", "text", (col) => col.notNull())
    .addColumn("network_goal_name", "text", (col) => col.notNull())
    .addColumn("name", sql<any>`longtext`, (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("description", sql<any>`longtext`)
    .addColumn("description", "text")
    .addColumn("image", "text")
    .addColumn("cashback", "text", (col) =>
      col.notNull().defaultTo(sql<any>`0.00`)
    )
    .addColumn("revenue", "text", (col) =>
      col.notNull().defaultTo(sql<any>`0.00`)
    )
    .addColumn("status", sql<any>`enum`, (col) =>
      col.defaultTo(sql<any>`'publish'`)
    )
    .addColumn("status", "text", (col) => col.defaultTo(sql<any>`'publish'`))
    .addColumn("is_translated", "boolean", (col) =>
      col.notNull().defaultTo(sql<any>`0`)
    )
    .addColumn("created_at", "timestamp")
    .addColumn("updated_at", "timestamp")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("offerwall_task_goals").execute();
}
