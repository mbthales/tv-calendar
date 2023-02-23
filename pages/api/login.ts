import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { setCookie } from "cookies-next";
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
            const jwtKey = new TextEncoder().encode(
              process.env.JWT_KEY as string
            );

            const authToken = await new SignJWT({ userId: user.id })
              .setProtectedHeader({ alg: "HS256" })
              .setExpirationTime("365d")
              .sign(jwtKey);

            setCookie("auth_token", authToken, {
              req,
              res,
              maxAge: 24 * 60 * 60 * 1000,
            });

            res.status(200).json({
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
