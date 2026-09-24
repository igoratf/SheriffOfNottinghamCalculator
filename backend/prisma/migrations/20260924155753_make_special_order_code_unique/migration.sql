/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `SpecialOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SpecialOrder_code_key" ON "SpecialOrder"("code");
