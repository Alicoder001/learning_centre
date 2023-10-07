/*
  Warnings:

  - You are about to drop the column `complete` on the `privateInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TotalInfo" ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "totalTeacher" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "privateInfo" DROP COLUMN "complete";
