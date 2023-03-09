import { GetServerSidePropsContext } from "next";
import { decodeJwt } from "jose";

export const getAuthCookie = (reqCtx: GetServerSidePropsContext) => {
  const cookie = reqCtx.req.headers.cookie;
  return cookie?.split("=")[1];
};

export const getUserId = (reqCtx: GetServerSidePropsContext) => {
  const authToken = getAuthCookie(reqCtx);
  const jwtPayload = authToken
    ? (decodeJwt(authToken) as { userId: number })
    : null;
  return jwtPayload?.userId;
};
