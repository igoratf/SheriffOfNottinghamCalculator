/*
  Warnings:

  - You are about to drop the column `appleCount` on the `MatchPlayer` table. All the data in the column will be lost.
  - You are about to drop the column `breadCount` on the `MatchPlayer` table. All the data in the column will be lost.
  - You are about to drop the column `cheeseCount` on the `MatchPlayer` table. All the data in the column will be lost.
  - You are about to drop the column `chickenCount` on the `MatchPlayer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MatchPlayer" DROP COLUMN "appleCount",
DROP COLUMN "breadCount",
DROP COLUMN "cheeseCount",
DROP COLUMN "chickenCount",
ADD COLUMN     "apple" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bread" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cheese" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "chicken" INTEGER NOT NULL DEFAULT 0;
