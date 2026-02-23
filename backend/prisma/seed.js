import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

// 1. Initialize the raw database pool
const pool = new Pool({ connectionString });

// 2. Initialize the Prisma adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to PrismaClient
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Define the base game items
  const contrabands = [
    // Standard Contraband
    { name: "Pepper", score: 6, resourceBonus: 0, resourceType: null },
    { name: "Mead", score: 7, resourceBonus: 0, resourceType: null },
    { name: "Silk", score: 9, resourceBonus: 0, resourceType: null },
    { name: "Crossbow", score: 7, resourceBonus: 0, resourceType: null },

    // Royal Goods (These give you extra points towards King/Queen)
    { name: "Green Apples", score: 4, resourceBonus: 2, resourceType: "apple" },
    {
      name: "Golden Apples",
      score: 6,
      resourceBonus: 3,
      resourceType: "apple",
    },
    {
      name: "Gouda Cheese",
      score: 6,
      resourceBonus: 2,
      resourceType: "cheese",
    },
    { name: "Bleu Cheese", score: 9, resourceBonus: 3, resourceType: "cheese" },
    { name: "Rye Bread", score: 4, resourceBonus: 2, resourceType: "bread" },
    { name: "Pumpernickel", score: 6, resourceBonus: 3, resourceType: "bread" },
    {
      name: "Royal Rooster",
      score: 8,
      resourceBonus: 2,
      resourceType: "chicken",
    },
  ];

  // Clear existing Contraband to prevent duplicates if you run this twice
  await prisma.contraband.deleteMany({});

  // Insert the items
  for (const item of contrabands) {
    await prisma.contraband.create({
      data: item,
    });
  }
  console.log(`✅ Added ${contrabands.length} Contraband items.`);

  // 2. Create a dummy match to test the dashboard
  const testMatch = await prisma.match.create({
    data: {
      players: {
        create: [
          {
            playerName: "Prince John",
            appleCount: 5,
            breadCount: 2,
            cheeseCount: 0,
            chickenCount: 1,
            coins: 15,
            totalScore: 35, // Placeholder calculated score
          },
          {
            playerName: "Robin Hood",
            appleCount: 0,
            breadCount: 4,
            cheeseCount: 3,
            chickenCount: 0,
            coins: 50,
            totalScore: 65, // Placeholder calculated score
          },
        ],
      },
    },
  });
  console.log(`✅ Created 1 test Match with 2 players.`);

  console.log("🎉 Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
