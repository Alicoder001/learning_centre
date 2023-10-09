-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_dayPartId_fkey";

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "dayPartId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_dayPartId_fkey" FOREIGN KEY ("dayPartId") REFERENCES "DayPart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
