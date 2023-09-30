/*
  Warnings:

  - You are about to drop the column `timeId` on the `Group` table. All the data in the column will be lost.
  - The `balance` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Time` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `finishTime` to the `DayPart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `DayPart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beginnedTime` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekPartId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `GroupType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDuration` to the `GroupType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_timeId_fkey";

-- AlterTable
ALTER TABLE "DayPart" ADD COLUMN     "finishTime" DATE NOT NULL,
ADD COLUMN     "startTime" DATE NOT NULL;

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "timeId",
ADD COLUMN     "beginnedTime" DATE NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weekPartId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GroupType" ADD COLUMN     "price" REAL NOT NULL,
ADD COLUMN     "totalDuration" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "userName" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
DROP COLUMN "balance",
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Time";

-- CreateTable
CREATE TABLE "WeekPart" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "WeekPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sendToId" INTEGER NOT NULL,
    "receivingId" INTEGER NOT NULL,
    "cmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "totalInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "totalStudent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "totalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "privateInfo" (
    "id" SERIAL NOT NULL,
    "totalSumm" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "privateInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeekPart_name_key" ON "WeekPart"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_sendToId_key" ON "Transaction"("sendToId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_receivingId_key" ON "Transaction"("receivingId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_weekPartId_fkey" FOREIGN KEY ("weekPartId") REFERENCES "WeekPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
