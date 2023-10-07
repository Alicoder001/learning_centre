/*
  Warnings:

  - Added the required column `link` to the `CenterType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CenterType" ADD COLUMN     "link" TEXT NOT NULL;
