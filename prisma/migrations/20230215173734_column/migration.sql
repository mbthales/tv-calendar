/*
  Warnings:

  - A unique constraint covering the columns `[showId]` on the table `TvShow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `showId` to the `TvShow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TvShow" ADD COLUMN     "showId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TvShow_showId_key" ON "TvShow"("showId");
