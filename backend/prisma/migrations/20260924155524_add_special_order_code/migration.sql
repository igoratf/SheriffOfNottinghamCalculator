/*
  Warnings:

  - Added the required column `code` to the `SpecialOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SpecialOrder" ADD COLUMN     "code" TEXT NOT NULL;
