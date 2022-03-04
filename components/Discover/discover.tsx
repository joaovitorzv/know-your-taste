import List from "components/List/list";
import { useTopItems } from "hooks/swr/useTopItems";
import { useEffect, useState } from "react";
import useSWR from "swr";

import styles from "./discover.module.css";
import discover from "./discover.module.scss";

interface DiscoverResponse {
  tracks: {
    id: string;
    name: string;
    explicit: boolean;
    isPlayable: boolean;
    preview_url: string;
    external_urls: {
      spotify: string;
    };
    artists: {
      name: string;
      id: string;
    }[];
  }[];
}

const Discover = () => {
  const { data: artists } = useTopItems("topArtists");
  const { data: tracks } = useTopItems("topTracks");

  const [SeedGenres, setSeedGenres] = useState();
  const [SeedArtists, setSeedArtists] = useState();
  const [SeedTracks, setSeedTracks] = useState();

  useEffect(() => {
    if (artists && tracks) {
      setSeedGenres(artists?.items[0].genres[0]);
      setSeedArtists(artists?.items[0].id);
      setSeedTracks(tracks?.items[0].id);
    }
  }, [artists, tracks]);

  const { data, error } = useSWR<DiscoverResponse>(
    artists
      ? `/api/discover?seed_genres=${SeedGenres}&seed_artists=${SeedArtists}&seed_tracks=${SeedTracks}` // takes all genres string from top artist
      : null,
    null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (!data && !error) return <p>loading...</p>;
  if (error) return <p>something bad happened.</p>;
  return (
    <div className={`${styles.discover}, ${discover.container}`}>
      <header>
        <h2>Discover new stuff</h2>
      </header>
      <div>
        {data?.tracks?.map((track) => (
          <List
            key={track.id}
            name={track.name}
            explicit={track.explicit}
            preview_url={track.preview_url}
            external_urls={track.external_urls}
            artists={track.artists}
            isPlayable={track.isPlayable}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
