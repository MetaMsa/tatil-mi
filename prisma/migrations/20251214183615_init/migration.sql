/*
  Warnings:

  - You are about to drop the column `title` on the `Holiday` table. All the data in the column will be lost.
  - Added the required column `text` to the `Holiday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Holiday" DROP COLUMN "title",
ADD COLUMN     "text" TEXT NOT NULL;
