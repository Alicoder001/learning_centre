-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_adminTypeId_fkey";

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "adminTypeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_adminTypeId_fkey" FOREIGN KEY ("adminTypeId") REFERENCES "AdminType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
