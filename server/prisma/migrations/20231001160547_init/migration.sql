/*
  Warnings:

  - Added the required column `dayPartId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "dayPartId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_dayPartId_fkey" FOREIGN KEY ("dayPartId") REFERENCES "DayPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
