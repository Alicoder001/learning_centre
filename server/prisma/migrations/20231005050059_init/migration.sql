/*
  Warnings:

  - You are about to drop the column `createdAt` on the `AdminType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AdminType` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `DayPart` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `DayPart` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `GroupType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `GroupType` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Sciense` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Sciense` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TeacherType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TeacherType` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `WeekPart` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `WeekPart` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `TotalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `privateInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "privateInfo" DROP CONSTRAINT "privateInfo_typeId_fkey";

-- AlterTable
ALTER TABLE "AdminType" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "DayPart" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "GroupType" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Sciense" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "TeacherType" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "TotalInfo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WeekPart" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "privateInfo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "typeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "privateInfo" ADD CONSTRAINT "privateInfo_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CenterType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
