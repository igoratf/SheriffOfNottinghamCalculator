import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { CONTRABAND_SCORE } from "../constants.js";
import { ResourceEnum } from "../types.js";

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

  const contrabands = [
    {
      name: "Pepper",
      score: CONTRABAND_SCORE.PEPPER,
      resourceBonus: 0,
      resourceType: null,
    },
    {
      name: "Mead",
      score: CONTRABAND_SCORE.MEAD,
      resourceBonus: 0,
      resourceType: null,
    },
    {
      name: "Silk",
      score: CONTRABAND_SCORE.SILK,
      resourceBonus: 0,
      resourceType: null,
    },
    {
      name: "Crossbow",
      score: CONTRABAND_SCORE.CROSSBOW,
      resourceBonus: 0,
      resourceType: null,
    },

    // Royal Goods (These give extra points towards King/Queen)
    {
      name: "Green Apples",
      score: CONTRABAND_SCORE.GREEN_APPLES,
      resourceBonus: 2,
      resourceType: ResourceEnum.APPLE,
    },
    {
      name: "Golden Apples",
      score: CONTRABAND_SCORE.GOLDEN_APPLES,
      resourceBonus: 3,
      resourceType: ResourceEnum.APPLE,
    },
    {
      name: "Gouda Cheese",
      score: CONTRABAND_SCORE.GOUDA_CHEESE,
      resourceBonus: 2,
      resourceType: ResourceEnum.CHEESE,
    },
    {
      name: "Bleu Cheese",
      score: CONTRABAND_SCORE.BLEU_CHEESE,
      resourceBonus: 3,
      resourceType: ResourceEnum.CHEESE,
    },
    {
      name: "Rye Bread",
      score: CONTRABAND_SCORE.RYE_BREAD,
      resourceBonus: 2,
      resourceType: ResourceEnum.BREAD,
    },
    {
      name: "Pumpernickel",
      score: CONTRABAND_SCORE.PUMPERNICKEL_BREAD,
      resourceBonus: 3,
      resourceType: ResourceEnum.BREAD,
    },
    {
      name: "Royal Rooster",
      score: CONTRABAND_SCORE.ROYAL_ROOSTER,
      resourceBonus: 2,
      resourceType: ResourceEnum.CHICKEN,
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
  await prisma.match.create({
    data: {
      players: {
        create: [
          {
            name: "Prince John",
            appleCount: 5,
            breadCount: 2,
            cheeseCount: 0,
            chickenCount: 1,
            coins: 15,
            totalScore: 35, // Placeholder calculated score
          },
          {
            name: "Robin Hood",
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
