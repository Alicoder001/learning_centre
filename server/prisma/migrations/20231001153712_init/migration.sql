/*
  Warnings:

  - Made the column `dayPartId` on table `Group` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_dayPartId_fkey";

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "dayPartId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_dayPartId_fkey" FOREIGN KEY ("dayPartId") REFERENCES "DayPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
