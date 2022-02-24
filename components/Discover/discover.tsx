import List from "components/List/list";
import { useTopItems } from "hooks/swr/useTopItems";

import useSWR from "swr";

interface DiscoverResponse {
  tracks?: {
    id: string;
    name: string;
    explicit: boolean;
    preview_url: string;
    artists: {
      name: string;
      id: string;
    }[];
  }[];
}

const Discover = () => {
  const { data: artists } = useTopItems("topArtists");
  const { data: tracks } = useTopItems("topTracks");

  const seed_genres = artists?.items[0].genres[0];
  const seed_artists = artists?.items[0].id;
  const seed_tracks = tracks?.items[0].id;

  const { data, error } = useSWR<DiscoverResponse>(
    artists
      ? `/api/discover?seed_genres=${seed_genres}&seed_artists=${seed_artists}&seed_tracks=${seed_tracks}` // takes all genres string from top artist
      : null
  );

  if (!data && !error) return <p>loading...</p>;
  if (error) return <p>something bad happened.</p>;
  return (
    <section>
      <h2>Discover new stuff</h2>
      <div>
        {data?.tracks?.map((track) => (
          <List
            key={track.id}
            name={track.name}
            explicit={track.explicit}
            preview_url={track.preview_url}
            artists={track.artists}
          />
        ))}
      </div>
    </section>
  );
};

export default Discover;
