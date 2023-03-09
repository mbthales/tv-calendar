import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { useContext, useEffect } from "react";
import { SearchTvShowType, FollowedTvShow } from "@/utils/types";

import SearchShow from "@/components/SearchShow";
import { UserContext } from "@/contexts/userContext";
import { getUserId } from "@/utils/functions";

export default function SearchTvShow({
  userId,
  followedTvShows,
}: SearchTvShowType) {
  const { setUserId, setFollowedTvShows } = useContext(UserContext);

  useEffect(() => {
    setUserId(userId);
    setFollowedTvShows(followedTvShows);
  }, []);

  return (
    <main>
      <h1>Search</h1>
      <SearchShow />
    </main>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const userId = getUserId(ctx);

  const getFollowedTvShows = async () => {
    const url = `http://localhost:3000/api/followed-tvshows/${userId}`;
    const res = await axios.get(url, {
      withCredentials: true,
      headers: {
        Cookie: ctx.req.headers.cookie,
      },
    });
    const resData: FollowedTvShow[] = await res.data;

    return resData;
  };

  if (!userId) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { userId, followedTvShows: await getFollowedTvShows() },
  };
}
