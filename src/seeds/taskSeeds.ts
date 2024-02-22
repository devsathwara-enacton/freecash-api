import { db } from "../database/database"; // Import your configured Kysely database instance

async function seedTasks() {
  const data = [
    {
      network: "Sample Network",
      offer_id: "sample_offer_1",
      campaign_id: "sample_campaign_1",
      category_id: 1,
      name: "Sample Offer 1",
      description: "This is a sample description for offer 1",
      instructions: "Sample instructions for offer 1",
      image: "/uploads/images/sample_image_1.jpg",
      url: "https://example.com/offer1",
      payout: 10.5,
      countries: JSON.stringify(["US", "UK"]),
      devices: JSON.stringify(["iOS", "Android"]),
      platforms: JSON.stringify(["Web", "Mobile"]),
      conversion_rate: 0.05,
      score: 0.9,
      daily_cap: 100,
      created_date: new Date(),
      start_date: new Date(),
      end_date: new Date(),
      offer_type: "Sample Type",
      network_categories: JSON.stringify(["Category 1", "Category 2"]),
      network_goals: JSON.stringify(["Goal 1", "Goal 2"]),
      redemptions: 0,
      clicks: 0,
      status: "publish" as const,
      is_translated: 0,
      is_featured: 1,
      goals_count: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Add more data objects as needed
  ];

  await db.insertInto("offerwall_tasks").values(data).execute();

  console.log("Offerwall networks seeded successfully.");
}

async function main() {
  try {
    await seedTasks();
  } catch (error) {
    console.error("Failed to seed offerwall networks:", error);
  } finally {
    await db.destroy(); // Ensure to close the database connection properly
  }
}

main();
