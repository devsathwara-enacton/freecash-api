import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("offerwall_task_goals")
    .addColumn("test", "integer")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("offerwall_task_goals")
    .dropColumn("test")
    .execute();
}
