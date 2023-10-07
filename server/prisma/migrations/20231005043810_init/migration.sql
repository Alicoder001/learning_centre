/*
  Warnings:

  - You are about to drop the `totalInfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `typeId` to the `privateInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "subject" DROP NOT NULL;

-- AlterTable
ALTER TABLE "privateInfo" ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "totalInfo";

-- CreateTable
CREATE TABLE "TotalInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "totalStudent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TotalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CenterType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CenterType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CenterType_name_key" ON "CenterType"("name");

-- AddForeignKey
ALTER TABLE "privateInfo" ADD CONSTRAINT "privateInfo_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CenterType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
