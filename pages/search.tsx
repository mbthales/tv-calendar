import { GetServerSidePropsContext } from "next";
import { decodeJwt } from "jose";

import SearchShow from "@/components/SearchShow";
import { UserContext } from "@/contexts/userContext";
import { useContext, useEffect } from "react";

export default function SearchTvShow({ userId }: { userId: number }) {
  const { setUserId } = useContext(UserContext);

  useEffect(() => {
    setUserId(userId);
  }, []);

  return (
    <main>
      <h1>Search</h1>
      <SearchShow />
    </main>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookie = ctx.req.headers.cookie;
  const authToken = cookie?.split("=")[1];
  const jwtPayload = authToken
    ? (decodeJwt(authToken) as { userId: number })
    : null;
  const userId = jwtPayload?.userId;

  if (!authToken) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { userId },
  };
}
