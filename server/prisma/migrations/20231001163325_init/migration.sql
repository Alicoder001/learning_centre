-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_weekPartId_fkey";

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "weekPartId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_weekPartId_fkey" FOREIGN KEY ("weekPartId") REFERENCES "WeekPart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
