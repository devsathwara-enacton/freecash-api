import { sql } from "kysely";
import fs from "fs";
import path from "path";
import { db } from "../database/database";

async function generateMigrationCode(tableName: string, schemaName: string) {
  const schemaResult = await sql<any>`
        SELECT COLUMN_NAME,COLUMN_TYPE, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT, COLUMN_KEY, EXTRA
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = ${tableName} AND TABLE_SCHEMA = ${schemaName}
    `.execute(db);
  const constraintsData = await sql<any>`SELECT 
  kcu.CONSTRAINT_NAME,
  kcu.COLUMN_NAME,
  kcu.REFERENCED_TABLE_NAME,
  kcu.REFERENCED_COLUMN_NAME,
  rc.UPDATE_RULE,
  rc.DELETE_RULE
FROM 
  INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS kcu
JOIN 
  INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS AS rc
ON 
  kcu.CONSTRAINT_NAME = rc.CONSTRAINT_NAME
WHERE 
  kcu.TABLE_NAME = 'offerwall_tasks' 
  AND kcu.TABLE_SCHEMA = 'laraback10_enactweb'
  AND kcu.REFERENCED_TABLE_NAME IS NOT NULL;`.execute(db);
  const schema = schemaResult.rows;
  let migrationUpCode = `import { Kysely, sql } from "kysely";\n\nexport async function up(db: Kysely<any>): Promise<void> {\n  await db.schema.createTable("${tableName}")\n`;
  let migrationDownCode = `export async function down(db: Kysely<any>): Promise<void> {\n  await db.schema.dropTable("${tableName}")`;

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

    if (DATA_TYPE == "varchar") {
      if (constraints.length > 0) {
        migrationUpCode += `    .addColumn("${COLUMN_NAME}", sql<any>\`${COLUMN_TYPE}\`, ${
          constraints.length > 0
            ? `(col) => col.${constraints.join(".")}`
            : "null"
        })\n`;
      } else {
        migrationUpCode += `    .addColumn("${COLUMN_NAME}", sql<any>\`${COLUMN_TYPE}\`)\n`;
      }
    }

    if (DATA_TYPE === "enum") {
      console.log(COLUMN_TYPE);
      if (constraints.length > 0) {
        migrationUpCode += `.addColumn("${COLUMN_NAME}", sql<any>\`${COLUMN_TYPE}\`, ${
          constraints.length > 0
            ? `(col) => col.${constraints.join(".")}`
            : "null"
        })\n`;
      } else {
        migrationUpCode += `    .addColumn("${COLUMN_NAME}", "${COLUMN_TYPE}")\n`;
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
        migrationUpCode += `    .addColumn("${COLUMN_NAME}", sql<any>\`${DATA_TYPE}\`)\n`;
      }
    }

    if (
      DATA_TYPE !== "enum" &&
      DATA_TYPE !== "longtext" &&
      DATA_TYPE !== "varchar"
    ) {
      // Mapping SQL data types to Kysely data types
      let kyselyType = mapSqlTypeToKysely(DATA_TYPE);
      if (constraints.length > 0) {
        migrationUpCode += `    .addColumn("${COLUMN_NAME}", "${kyselyType}", (col) => col.${constraints.join(
          "."
        )})\n`;
      } else {
        migrationUpCode += `    .addColumn("${COLUMN_NAME}", "${kyselyType}")\n`;
      }
    }
    constraintsData.rows.forEach((constraint) => {
      if (COLUMN_NAME == constraint.COLUMN_NAME) {
        migrationUpCode += `.addForeignKeyConstraint("${constraint.CONSTRAINT_NAME}", ["${constraint.COLUMN_NAME}"], "${constraint.REFERENCED_TABLE_NAME}", ["${constraint.REFERENCED_COLUMN_NAME}"]`;
        if (constraint.UPDATE_RULE) {
          migrationUpCode += `,(cb: any) =>
            cb.onUpdate('${constraint.UPDATE_RULE.toLowerCase()}')`;
          if (constraint.DELETE_RULE) {
            migrationUpCode += `.onDelete('${constraint.DELETE_RULE.toLowerCase()}')`;
          }
        }
        migrationUpCode += ")\n";
      }
    });
  });

  migrationUpCode += "    .execute();\n}\n\n";
  migrationDownCode += ".execute();\n}";

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
    case "timestamp":
      return "timestamp";
    default:
      return "text"; // Default fallback, adjust as needed
  }
}

// Call the function with your table name
generateMigrationCode(process.argv[2], process.argv[3]);
