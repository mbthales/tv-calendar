/*
  Warnings:

  - You are about to drop the column `showId` on the `TvShow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tvShowId]` on the table `TvShow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tvShowId` to the `TvShow` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TvShow_showId_key";

-- AlterTable
ALTER TABLE "TvShow" DROP COLUMN "showId",
ADD COLUMN     "tvShowId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TvShow_tvShowId_key" ON "TvShow"("tvShowId");
