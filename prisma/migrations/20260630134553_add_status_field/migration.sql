-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT,
    "message" TEXT NOT NULL,
    "projectName" TEXT,
    "bidAmount" TEXT,
    "blueprintFileName" TEXT,
    "transactionId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ContactSubmission" ("bidAmount", "blueprintFileName", "company", "createdAt", "email", "id", "message", "name", "phone", "projectName", "transactionId", "type", "updatedAt") SELECT "bidAmount", "blueprintFileName", "company", "createdAt", "email", "id", "message", "name", "phone", "projectName", "transactionId", "type", "updatedAt" FROM "ContactSubmission";
DROP TABLE "ContactSubmission";
ALTER TABLE "new_ContactSubmission" RENAME TO "ContactSubmission";
CREATE UNIQUE INDEX "ContactSubmission_transactionId_key" ON "ContactSubmission"("transactionId");
CREATE TABLE "new_EstimateInquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectType" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "details" TEXT,
    "transactionId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_EstimateInquiry" ("budget", "createdAt", "details", "email", "id", "name", "phone", "projectType", "timeline", "transactionId", "updatedAt") SELECT "budget", "createdAt", "details", "email", "id", "name", "phone", "projectType", "timeline", "transactionId", "updatedAt" FROM "EstimateInquiry";
DROP TABLE "EstimateInquiry";
ALTER TABLE "new_EstimateInquiry" RENAME TO "EstimateInquiry";
CREATE UNIQUE INDEX "EstimateInquiry_transactionId_key" ON "EstimateInquiry"("transactionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
