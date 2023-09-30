/*
  Warnings:

  - Added the required column `adminTypeId` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherTypeId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "adminTypeId" INTEGER NOT NULL,
ADD COLUMN     "teacherTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TeacherType" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "TeacherType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_teacherTypeId_fkey" FOREIGN KEY ("teacherTypeId") REFERENCES "TeacherType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_adminTypeId_fkey" FOREIGN KEY ("adminTypeId") REFERENCES "AdminType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
