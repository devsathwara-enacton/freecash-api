import { db } from "../database/database"; // Import your configured Kysely database instance

async function seedTasks() {
  const data = [
    {
      network: "Sample Network",
      task_offer_id: "sample_offer_1",
      network_task_id: "sample_campaign_1",
      network_goal_id: "sample_goal_1",
      network_goal_name: "Sample Goal 1",
      name: "Sample Task 1",
      description: "This is a sample description for task 1",
      image: "/uploads/images/sample_image_1.jpg",
      cashback: 10.5,
      revenue: 20.75,
      status: "publish" as const,
      is_translated: 0,
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Add more data objects as needed
  ];

  await db.insertInto("offerwall_task_goals").values(data).execute();

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
