-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowedTvShow" (
    "id" SERIAL NOT NULL,
    "tvShowId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FollowedTvShow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvShow" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TvShow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "FollowedTvShow_tvShowId_userId_key" ON "FollowedTvShow"("tvShowId", "userId");

-- AddForeignKey
ALTER TABLE "FollowedTvShow" ADD CONSTRAINT "FollowedTvShow_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "TvShow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowedTvShow" ADD CONSTRAINT "FollowedTvShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
