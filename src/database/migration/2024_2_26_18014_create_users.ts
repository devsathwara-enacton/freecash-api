import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "integer", (col) =>
      col.unsigned().autoIncrement().primaryKey()
    )
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("email", "varchar(255)", (col) => col.notNull())
    .addColumn("password", "varchar(255)", (col) => col.notNull())
    .addColumn("googleId", "varchar(255)", (col) => col.notNull())
    .addColumn("facebookId", "varchar(255)", (col) => col.notNull())
    .addColumn("is_verified", "boolean", (col) => col.notNull().defaultTo(0))
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("users").execute();
}
