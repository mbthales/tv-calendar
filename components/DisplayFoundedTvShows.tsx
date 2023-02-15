import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import axios from "axios";

type FoundTvShow = {
  id: number;
  name: string;
  status: string;
  networkName?: string;
};

export default function DisplayFoundedTvShows({
  foundTvShows,
}: {
  foundTvShows: FoundTvShow[];
}) {
  const { userId } = useContext(AuthContext);
  const followTvShow = async (tvShowId: number, name: string) => {
    const url = "/api/followed-tvshow";
    const res = await axios.post(url, {
      userId,
      tvShowId,
      name,
    });
    const resData = await res.data;

    console.log(resData);
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
