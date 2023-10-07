-- AlterTable
ALTER TABLE "TotalInfo" ADD COLUMN     "typeId" INTEGER;

-- AddForeignKey
ALTER TABLE "TotalInfo" ADD CONSTRAINT "TotalInfo_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CenterType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
