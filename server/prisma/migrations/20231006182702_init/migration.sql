/*
  Warnings:

  - Added the required column `isAttandance` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedTime` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "isAttandance" BOOLEAN NOT NULL,
ADD COLUMN     "startedTime" TIMESTAMP(3) NOT NULL;
