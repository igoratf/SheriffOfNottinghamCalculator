-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchPlayer" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "playerName" TEXT NOT NULL,
    "appleCount" INTEGER NOT NULL DEFAULT 0,
    "breadCount" INTEGER NOT NULL DEFAULT 0,
    "cheeseCount" INTEGER NOT NULL DEFAULT 0,
    "chickenCount" INTEGER NOT NULL DEFAULT 0,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "kingQueenBonus" INTEGER NOT NULL DEFAULT 0,
    "totalScore" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MatchPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contraband" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "resourceBonus" INTEGER NOT NULL DEFAULT 0,
    "resourceType" TEXT,

    CONSTRAINT "Contraband_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerContraband" (
    "id" SERIAL NOT NULL,
    "matchPlayerId" INTEGER NOT NULL,
    "contrabandId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "PlayerContraband_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerContraband" ADD CONSTRAINT "PlayerContraband_matchPlayerId_fkey" FOREIGN KEY ("matchPlayerId") REFERENCES "MatchPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerContraband" ADD CONSTRAINT "PlayerContraband_contrabandId_fkey" FOREIGN KEY ("contrabandId") REFERENCES "Contraband"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
