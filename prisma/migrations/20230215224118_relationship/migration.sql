-- DropForeignKey
ALTER TABLE "FollowedTvShow" DROP CONSTRAINT "FollowedTvShow_tvShowId_fkey";

-- AddForeignKey
ALTER TABLE "FollowedTvShow" ADD CONSTRAINT "FollowedTvShow_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "TvShow"("tvShowId") ON DELETE RESTRICT ON UPDATE CASCADE;
