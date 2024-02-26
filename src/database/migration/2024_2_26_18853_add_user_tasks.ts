import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("user_tasks")
    .addColumn("test", "integer")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("user_tasks").dropColumn("test").execute();
}
