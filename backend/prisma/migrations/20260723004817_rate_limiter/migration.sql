-- CreateTable
CREATE TABLE "rate_limit" (
    "id" TEXT NOT NULL,
    "requests" INTEGER NOT NULL,
    "windowStart" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rate_limit_pkey" PRIMARY KEY ("id")
);
