import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Create MuscleGroup table
  await db.schema
    .createTable("test_migration")
    .addColumn("id", "integer", (col: any) => col.autoIncrement().primaryKey())
    .addColumn("first_name", "varchar(50)", (col: any) => col.notNull())
    .addColumn("last_name", "varchar(255)")
    .execute();
  // Create Exercise table
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("muscle_group").execute();
}
