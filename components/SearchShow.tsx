"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios";

type TvShowRequest = {
  show: {
    id: number;
    name: string;
    network?: {
      name: string;
    };
  };
};

type FoundTvShow = {
  id: number;
  name: string;
  networkName?: string;
};

export default function SearchShow() {
  const [foundTvShows, setFoundTvShows] = useState<FoundTvShow[]>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{ showName: string }>();

  const getShows = async ({ showName }: { showName: string }) => {
    const url = `https://api.tvmaze.com/search/shows?q=${showName}`;
    const res = await axios.get(url);
    const resData: TvShowRequest[] = await res.data;
    const tvShows = resData.map(({ show: { id, name, network } }) => ({
      id,
      name,
      networkName: network?.name,
    }));
    setFoundTvShows(tvShows);
  };

  return (
    <form onSubmit={handleSubmit(getShows)}>
      <input type="text" {...register("showName", { required: true })} />
      <input type="submit" />
    </form>
  );
}
