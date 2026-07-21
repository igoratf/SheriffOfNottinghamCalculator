/*
  Warnings:

  - The `resourceType` column on the `Contraband` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `MatchPlayer` table. All the data in the column will be lost.
  - You are about to drop the column `totalScore` on the `MatchPlayer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Contraband` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matchId,name]` on the table `MatchPlayer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matchPlayerId,contrabandId]` on the table `PlayerContraband` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Resource" AS ENUM ('apple', 'bread', 'cheese', 'chicken');

-- AlterTable
ALTER TABLE "Contraband" DROP COLUMN "resourceType",
ADD COLUMN     "resourceType" "Resource";

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "totalScore" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "MatchPlayer" DROP COLUMN "createdAt",
DROP COLUMN "totalScore",
ADD COLUMN     "king" "Resource"[] DEFAULT ARRAY[]::"Resource"[],
ADD COLUMN     "queen" "Resource"[] DEFAULT ARRAY[]::"Resource"[],
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "coins" SET DEFAULT 0,
ALTER COLUMN "name" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Contraband_name_key" ON "Contraband"("name");

-- CreateIndex
CREATE INDEX "MatchPlayer_matchId_idx" ON "MatchPlayer"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchPlayer_matchId_name_key" ON "MatchPlayer"("matchId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerContraband_matchPlayerId_contrabandId_key" ON "PlayerContraband"("matchPlayerId", "contrabandId");
