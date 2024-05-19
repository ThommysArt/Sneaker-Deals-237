/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product_Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Product";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Product_Image";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Sneaker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "Sneaker_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sneaker_Size" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "size" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "sneaker_id" TEXT NOT NULL,
    CONSTRAINT "Sneaker_Size_sneaker_id_fkey" FOREIGN KEY ("sneaker_id") REFERENCES "Sneaker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sneaker_Color" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "sneaker_id" TEXT NOT NULL,
    CONSTRAINT "Sneaker_Color_sneaker_id_fkey" FOREIGN KEY ("sneaker_id") REFERENCES "Sneaker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sneaker_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sneaker_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    CONSTRAINT "Sneaker_Image_sneaker_id_fkey" FOREIGN KEY ("sneaker_id") REFERENCES "Sneaker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
