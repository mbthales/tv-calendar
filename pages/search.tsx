import { GetServerSidePropsContext } from "next";
import { decodeJwt } from "jose";
import axios from "axios";
import { useContext, useEffect } from "react";
import { FollowedTvShow } from "@/utils/types";

import SearchShow from "@/components/SearchShow";
import { UserContext } from "@/contexts/userContext";

export default function SearchTvShow({ userId }: { userId: number }) {
  const { setUserId, setFollowedTvShows } = useContext(UserContext);

  const getFollowedTvShows = async () => {
    const res = await axios.get(`api/followed-tvshows/${userId}`);
    const resData: FollowedTvShow[] = await res.data;

    setFollowedTvShows(resData);
  };

  useEffect(() => {
    setUserId(userId);
    getFollowedTvShows();
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
