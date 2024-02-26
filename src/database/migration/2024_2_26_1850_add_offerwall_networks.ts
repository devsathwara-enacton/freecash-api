import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("offerwall_networks")
    .addColumn("test", "integer")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("offerwall_networks").dropColumn("test").execute();
}
