import { db } from "../database/database"; // Ensure you import your configured Kysely database instance

async function seedOfferwallCategories() {
  const categories = [
    {
      name: "Category 1",
      icon: "/path/to/icon1.png", // assuming you have predefined icons
      banner_img: "/path/to/banner1.png",
      is_featured: 1,
      sort_order: 100,
      fg_color: "#FFFFFF",
      bg_color: "#000000",
      mapping_for: "tasks",
      match_keywords: "keyword1, keyword2",
      match_order: 100,
      item_count: 10,
      // created_at and updated_at can be omitted to use the default CURRENT_TIMESTAMP
    },
    // Add more category objects as needed
  ];

  await db.insertInto("offerwall_categories").values(categories).execute();

  console.log("Offerwall categories seeded successfully.");
}

async function main() {
  try {
    await seedOfferwallCategories();
  } catch (error) {
    console.error("Failed to seed offerwall categories:", error);
  } finally {
    await db.destroy(); // Close the database connection properly
  }
}

main();
