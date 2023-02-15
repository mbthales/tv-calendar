import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { User } from "@/utils/types";

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
        const hashPassword = bcrypt.hashSync(password, 10);
        const sanitizedUsername = username.toLowerCase();

        const checkIfUsernameExists = await prisma.user.findUnique({
          where: {
            username: sanitizedUsername,
          },
        });

        if (checkIfUsernameExists) {
          throw "Username already used!";
        } else {
          await prisma.user.create({
            data: {
              username: sanitizedUsername,
              password: hashPassword,
            },
          });

          res.status(200).json({ msg: "User created successfully!" });
        }
      } else {
        throw "Username or password empty!";
      }
    } catch (err) {
      res.status(400).json({ err: err });
    }
  }
}
