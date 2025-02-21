/*
  Warnings:

  - You are about to alter the column `priority` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `status` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "dueAt" DATETIME NOT NULL,
    "completedAt" DATETIME,
    "updatedAt" DATETIME,
    CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Todo" ("completedAt", "createdAt", "details", "dueAt", "id", "priority", "status", "title", "updatedAt", "userId") SELECT "completedAt", "createdAt", "details", "dueAt", "id", "priority", "status", "title", "updatedAt", "userId" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
