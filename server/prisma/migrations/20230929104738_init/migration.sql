/*
  Warnings:

  - You are about to drop the column `teacherTypeId` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_teacherTypeId_fkey";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "teacherTypeId",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TeacherType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
