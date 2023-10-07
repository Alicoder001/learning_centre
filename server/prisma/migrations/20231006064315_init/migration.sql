/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `CenterType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `CenterType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CenterType" ADD COLUMN     "description" TEXT,
ADD COLUMN     "info" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CenterType_title_key" ON "CenterType"("title");
