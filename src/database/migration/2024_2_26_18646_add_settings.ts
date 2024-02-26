import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("settings").addColumn("test", "integer").execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("settings").dropColumn("test").execute();
}
