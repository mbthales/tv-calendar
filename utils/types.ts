//API
export type User = {
  username: string;
  password: string;
};

export type TvShow = {
  tvShowId: number;
  name: string;
};

export type FollowedTvShow = {
  id: number
  tvShowId: number;
  userId: number;
};

//CLIENT
export type LoginForm = {
  username: string;
  password: string;
  error: string | null;
};

export type ResLoginData = {
  authToken: string;
  msg: string;
  err: string;
};

export type ResTvShowData = {
  show: {
    id: number;
    name: string;
    status: string;
    network?: {
      name: string;
    };
  };
};

export type FoundTvShow = {
  id: number;
  name: string;
  status: string;
  networkName?: string;
};
