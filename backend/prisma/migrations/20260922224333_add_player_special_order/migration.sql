-- CreateTable
CREATE TABLE "SpecialOrder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "SpecialOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerSpecialOrder" (
    "id" SERIAL NOT NULL,
    "matchPlayerId" INTEGER NOT NULL,
    "specialOrderId" INTEGER NOT NULL,

    CONSTRAINT "PlayerSpecialOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerSpecialOrder_matchPlayerId_specialOrderId_key" ON "PlayerSpecialOrder"("matchPlayerId", "specialOrderId");

-- AddForeignKey
ALTER TABLE "PlayerSpecialOrder" ADD CONSTRAINT "PlayerSpecialOrder_matchPlayerId_fkey" FOREIGN KEY ("matchPlayerId") REFERENCES "MatchPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSpecialOrder" ADD CONSTRAINT "PlayerSpecialOrder_specialOrderId_fkey" FOREIGN KEY ("specialOrderId") REFERENCES "SpecialOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
