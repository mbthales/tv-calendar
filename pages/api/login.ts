import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../utils/types";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    const { username, password }: User = req.body;

    try {
      if (username && password) {
        const sanitizedUsername = username.toLowerCase();
        const user = await prisma.user.findUnique({
          where: {
            username: sanitizedUsername,
          },
        });

        if (user) {
          const checkIfPasswordMatch = bcrypt.compareSync(
            password,
            user.password
          );

          if (checkIfPasswordMatch) {
            const authToken = jwt.sign(
              {
                userId: user.id,
              },
              process.env.SECRET_KEY as string,
              { expiresIn: "365d" }
            );

            res.status(200).json({
              authToken,
              msg: "Logged successfully!",
            });
          } else {
            throw "Wrong username or password!";
          }
        } else {
          throw "Wrong username or password!";
        }
      } else {
        throw "Username or password empty!";
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  }
}
