/*
  Warnings:

  - You are about to alter the column `durationTime` on the `DayPart` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.

*/
-- AlterTable
ALTER TABLE "DayPart" ALTER COLUMN "durationTime" SET DATA TYPE REAL;
