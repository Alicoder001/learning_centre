/*
  Warnings:

  - You are about to drop the column `createdAt` on the `AdminType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AdminType` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `DayPart` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `DayPart` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `GroupType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `GroupType` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Sciense` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Sciense` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TeacherType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TeacherType` table. All the data in the column will be lost.
  - You are about to drop the column `cmount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `WeekPart` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `WeekPart` table. All the data in the column will be lost.
  - You are about to drop the `totalInfo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userTypeId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedTime` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userTypeId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userTypeId` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `privateInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_adminTypeId_fkey";

-- DropIndex
DROP INDEX "Student_student_id_key";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "userTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AdminType" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "DayPart" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "durationTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GroupType" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "roomId",
ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "isAttandance" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isNotDone" BOOLEAN,
ADD COLUMN     "startedTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "subject" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Muster" ALTER COLUMN "isBeen" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Sciense" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "student_id",
ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD COLUMN     "userTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "userTypeId" INTEGER NOT NULL,
ALTER COLUMN "adminTypeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TeacherType" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "cmount",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "WeekPart" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "privateInfo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "typeId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "totalInfo";

-- CreateTable
CREATE TABLE "UserType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TotalInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "typeId" INTEGER,

    CONSTRAINT "TotalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CenterType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "info" TEXT,
    "link" TEXT NOT NULL,

    CONSTRAINT "CenterType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CenterType_name_key" ON "CenterType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CenterType_title_key" ON "CenterType"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentId_key" ON "Student"("studentId");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_adminTypeId_fkey" FOREIGN KEY ("adminTypeId") REFERENCES "AdminType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TotalInfo" ADD CONSTRAINT "TotalInfo_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CenterType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "privateInfo" ADD CONSTRAINT "privateInfo_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CenterType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
