import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("offerwall_tasks")
    .addColumn("age", "integer")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("offerwall_tasks").dropColumn("age").execute();
}
