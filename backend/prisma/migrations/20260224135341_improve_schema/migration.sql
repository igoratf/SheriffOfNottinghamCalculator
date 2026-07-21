/*
  Warnings:

  - You are about to drop the column `kingQueenBonus` on the `MatchPlayer` table. All the data in the column will be lost.
  - You are about to drop the column `playerName` on the `MatchPlayer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MatchPlayer" DROP COLUMN "kingQueenBonus",
DROP COLUMN "playerName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Player',
ALTER COLUMN "coins" DROP DEFAULT;
