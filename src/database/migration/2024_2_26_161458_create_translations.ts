import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("translations")
    .addColumn("id", "bigint", (col) =>
      col.unsigned().autoIncrement().primaryKey()
    )
    .addColumn("page", "varchar(100)", (col) => col.notNull())
    .addColumn("module", "varchar(100)", (col) => col.notNull())
    .addColumn("trans_key", "varchar(100)", (col) => col.notNull())
    .addColumn("trans_value", "text", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("translations").execute();
}
