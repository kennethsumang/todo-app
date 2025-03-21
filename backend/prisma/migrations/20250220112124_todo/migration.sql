-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL COLLATE NOCASE,
    "details" TEXT NOT NULL COLLATE NOCASE,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "dueAt" DATETIME NOT NULL,
    "completedAt" DATETIME,
    "updatedAt" DATETIME
);
