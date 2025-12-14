/*
  Warnings:

  - You are about to drop the column `isOfficial` on the `Holiday` table. All the data in the column will be lost.
  - You are about to drop the column `isSocial` on the `Holiday` table. All the data in the column will be lost.
  - Added the required column `source` to the `Holiday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Holiday" DROP COLUMN "isOfficial",
DROP COLUMN "isSocial",
ADD COLUMN     "source" TEXT NOT NULL;
