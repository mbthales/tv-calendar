import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import { FoundTvShow } from "@/utils/types";

export default function DisplayFoundedTvShows({
  foundTvShows,
}: {
  foundTvShows: FoundTvShow[];
}) {
  const { userId } = useContext(UserContext);

  const followTvShow = async (tvShowId: number, name: string) => {
    try {
      const url = `/api/follow-tvshow`;
      const res = await axios.post(url, {
        userId,
        tvShowId,
        name,
      });
      const { message } = res.data;
      console.log(message);
    } catch (error) {
      console.log(error);
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
            <button onClick={() => followTvShow(id, name)}>Follow</button>
          </div>
        ))
      )}
    </div>
  );
}
