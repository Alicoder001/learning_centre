/*
  Warnings:

  - You are about to drop the column `student_id` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Student_student_id_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "student_id",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentId_key" ON "Student"("studentId");
