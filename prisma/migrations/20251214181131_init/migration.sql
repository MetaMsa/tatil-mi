/*
  Warnings:

  - You are about to drop the column `source` on the `Holiday` table. All the data in the column will be lost.
  - Added the required column `isOfficial` to the `Holiday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSocial` to the `Holiday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Holiday" DROP COLUMN "source",
ADD COLUMN     "isOfficial" BOOLEAN NOT NULL,
ADD COLUMN     "isSocial" BOOLEAN NOT NULL;
