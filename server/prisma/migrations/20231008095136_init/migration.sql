/*
  Warnings:

  - You are about to drop the column `name` on the `DayPart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DayPart" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "WeekPart" ADD COLUMN     "name" TEXT;
