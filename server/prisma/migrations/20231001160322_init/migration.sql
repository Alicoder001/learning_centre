/*
  Warnings:

  - You are about to drop the column `dayPartId` on the `Group` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_dayPartId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "dayPartId";
