import next from "next";
import { useState } from "react";
import useSWR from "swr";

interface PlaylistsResponse {
  items: UserPlaylists[];
  next: string;
  limit: number;
  offset: number;
  total: number;
}

interface UserPlaylists {
  id: string;
  name: string;
  image: {
    source: string;
    height: number;
    width: number;
  };
  public: boolean;
  description: string;
}

const MyPlaylists = () => {
  const [loadNext, setLoadNext] = useState(false);
  const { data, error, isValidating } = useSWR<PlaylistsResponse>(
    `/api/my-taste/user/playlists?next=${next}`
  );
  // TODO: INFINITE PAGINATION AND IMAGES
  // MAKE THIS COMPONENT REUSABLE???
  if (!data) return <p>loading user playlists...</p>;

  return (
    <section>
      <h3>My {data?.total} Playlists</h3>
      <div style={{ width: "300px" }}>
        {data.items.map((playlist) => (
          <div key={playlist.id} style={{ display: "inline-flex" }}>
            <h4>{playlist.name}</h4>
            <p>{playlist.description}</p>
            <span>{playlist.public ? "public" : "private"}</span>
            <button>Delete playlist</button>
          </div>
        ))}
      </div>
      <div>
        <button>show more</button>
      </div>
    </section>
  );
};

export default MyPlaylists;
