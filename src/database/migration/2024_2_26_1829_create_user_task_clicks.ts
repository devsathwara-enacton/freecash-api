import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user_task_clicks")
    .addColumn("id", "bigint", (col) =>
      col.unsigned().autoIncrement().primaryKey()
    )
    .addColumn("user_id", "bigint", (col) => col.notNull())
    .addColumn("platform", "char(50)", (col) => col.notNull())
    .addColumn("task_type", "char(25)", (col) => col.notNull())
    .addColumn("network", "char(25)", (col) => col.notNull())
    .addColumn("task_offer_id", "char(50)", (col) => col.notNull())
    .addColumn("campaign_id", "char(50)", (col) => col.notNull())
    .addColumn("clicked_on", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .addColumn("countries", "varchar(255)", (col) => col.notNull())
    .addColumn("locale", "varchar(255)", (col) => col.notNull())
    .addColumn("Referer", "varchar(255)", (col) => col.notNull())
    .addColumn("user_agent", "varchar(255)", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("user_task_clicks").execute();
}
