import { createContext, useState } from "react";

import { FollowedTvShow } from "@/utils/types";

type UserContextType = {
  userId: number | null;
  setUserId: (userId: number | null) => void;
  followedTvShows: FollowedTvShow[] | null;
  setFollowedTvShows: (followedTvShow: FollowedTvShow[] | null) => void;
};

export const UserContext = createContext({} as UserContextType);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [followedTvShows, setFollowedTvShows] = useState<
    FollowedTvShow[] | null
  >(null);

  return (
    <UserContext.Provider
      value={{ userId, setUserId, followedTvShows, setFollowedTvShows }}
    >
      {children}
    </UserContext.Provider>
  );
}
