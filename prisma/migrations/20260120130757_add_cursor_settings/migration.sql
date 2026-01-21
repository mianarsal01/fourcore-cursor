-- CreateTable
CREATE TABLE "CursorSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "settings" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CursorSettings_shop_key" ON "CursorSettings"("shop");
