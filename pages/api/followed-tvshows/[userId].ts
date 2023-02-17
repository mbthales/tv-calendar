import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { userId } = req.query;

  if (method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (user) {
        const followedTvShows = await prisma.followedTvShow.findMany({
          where: {
            userId: Number(userId),
          },
        });

        res.status(200).json(followedTvShows);
      } else {
        throw "User not found!";
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  }
}
