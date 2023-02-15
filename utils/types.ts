export type User = {
  username: string;
  password: string;
};

export type TvShow = {
  tvShowId: number;
  name: string;
};

export type FollowedTvShow = {
  tvShowId: number;
  userId: number;
};
