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

  const SPECIAL_ORDER_LIST = [
    { code: "APPLE_CROSSBOW", name: "Apple + Crossbow", value: 6 },
    { code: "APPLE_MEAD_1", name: "Apple + Mead", value: 6 },
    { code: "APPLE_MEAD_2", name: "Apple + Mead", value: 6 },
    { code: "APPLE_SILK", name: "Apple + Silk", value: 6 },
    { code: "APPLE_PEPPER_1", name: "Apple + Pepper", value: 7 },
    { code: "APPLE_PEPPER_2", name: "Apple + Pepper", value: 7 },
    { code: "BREAD_MEAD", name: "Bread + Mead", value: 5 },
    { code: "BREAD_SILK", name: "Bread + Silk", value: 5 },
    { code: "BREAD_PEPPER", name: "Bread + Pepper", value: 6 },
    { code: "CHEESE_MEAD", name: "Cheese + Mead", value: 5 },
    { code: "CHEESE_SILK", name: "Cheese + Silk", value: 5 },
    { code: "CHEESE_PEPPER", name: "Cheese + Pepper", value: 6 },
    { code: "CHICKEN_SILK", name: "Chicken + Silk", value: 4 },
    { code: "CHICKEN_MEAD", name: "Chicken + Mead", value: 5 },
    { code: "CHICKEN_PEPPER", name: "Chicken + Pepper", value: 5 },
  ];

  const CONTRABANDS_LIST = [
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

  // Insert the items
  /*   for (const item of CONTRABANDS_LIST) {
    await prisma.contraband.upsert({
      data: item,
      where: { id: item.}
    });
  } */

  await prisma.$transaction(
    SPECIAL_ORDER_LIST.map((item) =>
      prisma.specialOrder.upsert({
        where: { code: item.code },
        update: {
          name: item.name,
          value: item.value,
        },
        create: item,
      }),
    ),
  );

  /* console.log(`✅ Added ${CONTRABANDS_LIST.length} Contraband items.`); */
  console.log(`✅ Upserted ${SPECIAL_ORDER_LIST.length} Special Order items.`);

  // 2. Create a dummy match to test the dashboard
  if (process.env.NODE_ENV === "production") {
    console.log("⚠️ Skipping dummy match creation in production.");
    return;
  }

  await prisma.match.create({
    data: {
      players: {
        create: [
          {
            name: "Prince John",
            apple: 5,
            bread: 2,
            cheese: 0,
            chicken: 1,
            coins: 15,
            score: 35, // Placeholder calculated score
          },
          {
            name: "Robin Hood",
            apple: 0,
            bread: 4,
            cheese: 3,
            chicken: 0,
            coins: 50,
            score: 65, // Placeholder calculated score
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
