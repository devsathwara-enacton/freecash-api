import { sql } from "kysely";
import fs from "fs";
import path from "path";
import { db } from "../database/database";

async function generateMigrationCode(tableName: string) {
  const schemaResult = await sql<any>`
        SELECT COLUMN_NAME,COLUMN_TYPE, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT, COLUMN_KEY, EXTRA
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = ${tableName} AND TABLE_SCHEMA = "laraback10_enactweb" 
    `.execute(db);
  const schema = schemaResult.rows;

  let migrationUpCode = `import { Kysely, sql } from "kysely";\n\nexport async function up(db: Kysely<any>): Promise<void> {\n  await db.schema.createTable("${tableName}")\n`;
  let migrationDownCode = `export async function down(db: Kysely<any>): Promise<void> {\n  await db.schema.dropTable("${tableName}").execute();\n}`;

  schema.forEach((column) => {
    const {
      COLUMN_NAME,
      DATA_TYPE,
      COLUMN_TYPE,
      IS_NULLABLE,
      COLUMN_DEFAULT,
      COLUMN_KEY,
      EXTRA,
    } = column;
    console.log(COLUMN_TYPE);
    let constraints = [];

    // Primary Key
    if (COLUMN_KEY === "PRI") constraints.push("primaryKey()");
    // Auto Increment
    if (EXTRA === "auto_increment") constraints.push("autoIncrement()");
    // Not Null
    if (IS_NULLABLE === "NO") constraints.push("notNull()");
    // Unique
    if (COLUMN_KEY === "UNI") constraints.push("unique()");
    // Default Value
    if (COLUMN_DEFAULT && COLUMN_DEFAULT !== "NULL") {
      if (COLUMN_TYPE === "timestamp") {
        constraints.push(`defaultTo(sql<any>\`CURRENT_TIMESTAMP\`)`);
      } else {
        constraints.push(`defaultTo(sql<any>\`${COLUMN_DEFAULT}\`)`);
      }
    }
    if (DATA_TYPE === "enum") {
      if (constraints.length > 0) {
        migrationUpCode += `    .addColumn("${COLUMN_NAME}", sql<any>\`${DATA_TYPE}\`, ${
          constraints.length > 0
            ? `(col) => col.${constraints.join(".")}`
            : "null"
        })\n`;
      } else {
        migrationUpCode += `    .addColumn("${COLUMN_NAME}", "${DATA_TYPE}")\n`;
      }
    }
    if (DATA_TYPE === "longtext") {
      if (constraints.length > 0) {
        migrationUpCode += `    .addColumn("${COLUMN_NAME}", sql<any>\`${DATA_TYPE}\`, ${
          constraints.length > 0
            ? `(col) => col.${constraints.join(".")}`
            : "null"
        })\n`;
      } else {
        migrationUpCode += `    .addColumn("${COLUMN_NAME}", "${DATA_TYPE}")\n`;
      }
    }
    // Mapping SQL data types to Kysely data types
    let kyselyType = mapSqlTypeToKysely(DATA_TYPE);
    if (constraints.length > 0) {
      migrationUpCode += `    .addColumn("${COLUMN_NAME}", "${kyselyType}", (col) => col.${constraints.join(
        "."
      )})\n`;
    } else {
      migrationUpCode += `    .addColumn("${COLUMN_NAME}", "${kyselyType}")\n`;
    }
  });

  migrationUpCode += "    .execute();\n}\n\n";

  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "");
  // Optionally, write the generated code to files
  const migrationFilePath = path.join(
    __dirname,
    `${timestamp}_${tableName}_migration.ts`
  );
  fs.writeFileSync(migrationFilePath, `${migrationUpCode}${migrationDownCode}`);
  console.log(`Migration file generated at: ${migrationFilePath}`);
}

function mapSqlTypeToKysely(sqlType: any): string {
  switch (sqlType) {
    case "bigint":
      return "bigint";
    case "int":
      return "integer";
    case "tinyint":
      return "boolean"; // Assuming tinyint(1) is used for boolean
    case "varchar":
    case "text":
      return "text";
    case "timestamp":
      return "timestamp";
    case "varchar":
      return "varchar";
    default:
      return "text"; // Default fallback, adjust as needed
  }
}

// Call the function with your table name
generateMigrationCode(process.argv[2]);
