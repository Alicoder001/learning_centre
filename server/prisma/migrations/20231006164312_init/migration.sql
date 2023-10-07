/*
  Warnings:

  - You are about to drop the column `roomId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `cmount` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_roomId_fkey";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "roomId";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "cmount",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
