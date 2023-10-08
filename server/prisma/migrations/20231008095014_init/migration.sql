-- AlterTable
ALTER TABLE "DayPart" ADD COLUMN     "name" TEXT,
ALTER COLUMN "durationTime" DROP NOT NULL;
