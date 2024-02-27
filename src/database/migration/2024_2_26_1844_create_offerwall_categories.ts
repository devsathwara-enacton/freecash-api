import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("offerwall_categories")
    .addColumn("id", "bigint", (col) =>
      col.unsigned().autoIncrement().primaryKey()
    )
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("icon", "varchar(255)", (col) => col.notNull())
    .addColumn("banner_img", "varchar(255)", (col) => col.notNull())
    .addColumn("is_featured", "boolean", (col) =>
      col.notNull().defaultTo(sql<any>`0`)
    )
    .addColumn("sort_order", "integer", (col) =>
      col
        .unsigned()
        .notNull()
        .defaultTo(sql<any>`100`)
    )
    .addColumn("fg_color", "varchar(255)", (col) => col.notNull())
    .addColumn("bg_color", "varchar(255)", (col) => col.notNull())
    .addColumn("mapping_for", "varchar(255)", (col) =>
      col.notNull().defaultTo(sql<any>`tasks`)
    )
    .addColumn("match_keywords", "varchar(1000)", (col) => col.notNull())
    .addColumn("match_order", "integer", (col) =>
      col
        .unsigned()
        .notNull()
        .defaultTo(sql<any>`100`)
    )
    .addColumn("item_count", "integer", (col) =>
      col
        .unsigned()
        .notNull()
        .defaultTo(sql<any>`0`)
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql<any>`CURRENT_TIMESTAMP`)
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("offerwall_categories").execute();
}
