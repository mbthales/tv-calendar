import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ReqBody = {
  userId: number;
  tvShowId: number;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    const { userId, tvShowId, name }: ReqBody = req.body;

    console.log(req.body)
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user) {
        const tvShow = await prisma.tvShow.findUnique({
          where: {
            tvShowId,
          },
        });

        if (!tvShow) {
          await prisma.tvShow.create({
            data: {
              tvShowId,
              name,
              FollowedTvShow: {
                connectOrCreate: {
                  where: {
                    followedTvShow: { tvShowId, userId },
                  },
                  create: {
                    userId,
                  },
                },
              },
            },
          });

          res.status(200).json({ msg: "Tv show created and followed!" });
        } else {
          const followedTvShow = await prisma.followedTvShow.findUnique({
            where: {
              followedTvShow: { tvShowId, userId },
            },
          });

          if (!followedTvShow) {
            await prisma.followedTvShow.create({
              data: {
                userId,
                tvShowId,
              },
            });
            res.status(200).json({ msg: "Tv show followed!" });
          } else {
            res.status(200).json({ msg: "User already follows the tv show!" });
          }
        }
      } else {
        throw "User not found!";
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  }
}
