import axios, { isAxiosError } from "axios";
import { useContext, useState } from "react";

import { UserContext } from "@/contexts/userContext";
import { FoundTvShow } from "@/utils/types";

export default function DisplayFoundedTvShows({
  foundTvShows,
}: {
  foundTvShows: FoundTvShow[];
}) {
  const { userId, followedTvShows } = useContext(UserContext);
  const [followedTvShowsIds, setfollowedTvShowsIds] = useState(
    followedTvShows?.map(({ tvShowId }) => tvShowId)
  );
  const [apiError, setApiError] = useState<string | null>(null);

  const followTvShow = async (tvShowId: number, name: string) => {
    try {
      const url = `/api/follow-tvshow`;
      await axios.post(url, {
        userId,
        tvShowId,
        name,
      });

      setfollowedTvShowsIds((oldArray) => [
        ...(oldArray as number[]),
        tvShowId,
      ]);
    } catch (error) {
      if (isAxiosError(error)) {
        setApiError(error.message);
      }
    }
  };

  return (
    <div>
      {foundTvShows.length === 0 ? (
        <p>Tv show don't found!</p>
      ) : (
        foundTvShows.map(({ id, name, networkName, status }) => (
          <div key={id}>
            <p>
              <span>{name}</span>
              {networkName && <span> ({networkName})</span>}
              <span> - {status}</span>
            </p>
            {apiError ? (
              <p>{apiError}</p>
            ) : followedTvShowsIds?.includes(id) ? (
              <p>Followed</p>
            ) : (
              <button onClick={() => followTvShow(id, name)}>Follow</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
