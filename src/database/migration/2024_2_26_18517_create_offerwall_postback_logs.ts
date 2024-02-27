import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("postbacks")
    .addColumn("id", "bigint", (col) =>
      col.unsigned().autoIncrement().primaryKey()
    )
    .addColumn("network", "char(50)", (col) => col.notNull())
    .addColumn("transaction_id", "char(50)", (col) => col.notNull())
    .addColumn("payload", "text", (col) => col.notNull())
    .addColumn("data", "text", (col) => col.notNull())
    .addColumn("status", "varchar", (col) => col.notNull())
    .addColumn("message", "varchar(255)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("postbacks").execute();
}
