/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AdminType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `DayPart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `GroupType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `TeacherType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Time` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AdminType_name_key" ON "AdminType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DayPart_name_key" ON "DayPart"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GroupType_name_key" ON "GroupType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherType_name_key" ON "TeacherType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Time_name_key" ON "Time"("name");
