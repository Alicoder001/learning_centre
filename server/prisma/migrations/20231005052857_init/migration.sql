/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TotalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `totalStudent` on the `TotalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `totalTeacher` on the `TotalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TotalInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TotalInfo" DROP COLUMN "createdAt",
DROP COLUMN "totalStudent",
DROP COLUMN "totalTeacher",
DROP COLUMN "updatedAt";
