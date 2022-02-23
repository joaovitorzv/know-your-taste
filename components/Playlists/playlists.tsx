import next from "next";
import { useState } from "react";
import useSWR from "swr";
import Playlist from "./playlist";
import type { UserPlaylists } from "./myPlaylists";
import type { DiscoverPlaylists } from "./discoverPlaylists";

interface PlaylistsResponse {
  items: UserPlaylists[] | DiscoverPlaylists[]; // Generic here?
  next: string;
  limit: number;
  offset: number;
  total: number;
}

const Playlists = ({}) => {
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
        {data.items.map((p) => (
          <Playlist
            key={p.id}
            name={p.name}
            description={p.description}
            isPublic={p.public}
            action={() => {}}
          />
        ))}
      </div>
      <div>
        <button>show more</button>
      </div>
    </section>
  );
};

export default Playlists;
