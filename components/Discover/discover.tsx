import List from "components/List/list";
import { useTopItems } from "hooks/swr/useTopItems";
import { useEffect, useState } from "react";
import useSWR from "swr";
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
    album: {
      images: { url: string }[];
    };
  }[];
}

const Discover = () => {
  const { data: artists } = useTopItems("topArtists");
  const { data: tracks } = useTopItems("topTracks");

  const [seedGenres, setSeedGenres] = useState<string>();
  const [seedArtists, setSeedArtists] = useState<string>();
  const [seedTracks, setSeedTracks] = useState<string>();

  useEffect(() => {
    if (artists?.items && tracks?.items) {
      setSeedGenres(artists.items[0].genres[0]);
      setSeedArtists(artists.items[0].id);
      setSeedTracks(tracks.items[0].id);
    }
  }, [artists, tracks]);

  const { data, error } = useSWR<DiscoverResponse>(
    artists
      ? `/api/discover?seed_genres=${seedGenres}&seed_artists=${seedArtists}&seed_tracks=${seedTracks}` // takes all genres string from top artist
      : null,
    null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log(
    `/api/discover?seed_genres=${seedGenres}&seed_artists=${seedArtists}&seed_tracks=${seedTracks}`
  );

  const listSkeleton = [];
  for (let i = 0; i < 5; i++)
    listSkeleton.push(<List isLoading={true} key={i} />);

  if (error) return <p>something bad happened.</p>;

  return (
    <div className={`${discover.container}`}>
      <header>
        <h2>Descubra coisas novas</h2>
      </header>
      <div>
        {!data && !error ? (
          <>{listSkeleton}</>
        ) : (
          data?.tracks?.map((track) => (
            <List
              key={track.id}
              name={track.name}
              coverImage={track.album.images[0].url}
              explicit={track.explicit}
              preview_url={track.preview_url}
              external_urls={track.external_urls}
              artists={track.artists}
              isPlayable={track.isPlayable}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Discover;
