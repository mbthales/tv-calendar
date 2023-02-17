import { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios";

import DisplayFoundedTvShows from "./DisplayFoundedTvShows";

import { FoundTvShow, ResTvShowData } from "@/utils/types";

export default function SearchShow() {
  const [foundTvShows, setFoundTvShows] = useState<FoundTvShow[] | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{ showName: string }>();

  const getShows = async ({ showName }: { showName: string }) => {
    try {
      const url = `https://api.tvmaze.com/search/shows?q=${showName}`;
      const res = await axios.get(url);
      const resData: ResTvShowData[] = await res.data;
      const tvShows = resData.map(
        ({ show: { id, name, network, status } }) => ({
          id,
          name,
          status,
          networkName: network?.name,
        })
      );

      setFoundTvShows(tvShows);
    } catch (error) {
      if (isAxiosError(error)) {
        setError("root", {
          message: error.message,
        });
      }
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit(getShows)}>
        <input type="text" {...register("showName", { required: true })} />
        <input type="submit" />
        {errors.root && <p> {errors.root.message}</p>}
      </form>
      {foundTvShows && <DisplayFoundedTvShows foundTvShows={foundTvShows} />}
    </main>
  );
}
