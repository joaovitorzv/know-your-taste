import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import Playlist from "./playlist";

export interface UserPlaylists {
  id: string;
  name: string;
  image: {
    source: string;
    height: number;
    width: number;
  };
  isPublic: boolean;
  description: string;
}

interface PlaylistsResponse {
  items: UserPlaylists[];
  next: string;
  limit: number;
  offset: number;
  total: number;
}

const PAGE_LIMIT = 12;

const getKey: SWRInfiniteKeyLoader = (pageIndex, prevData) => {
  if (prevData && !prevData.next) return null;
  if (pageIndex === 0) return `/api/user/playlists?limit=${PAGE_LIMIT}`;

  return `/api/user/playlists?next=${prevData.next}`;
};

const DiscoverArtists = () => {
  const { data, error, setSize, size } =
    useSWRInfinite<PlaylistsResponse>(getKey);

  const isLoading = !data && !error;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.length === 0;
  const isTheEnd = isEmpty || (data && data[data.length - 1].next === null);

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>something bad happened!</p>;

  return (
    <section>
      <h3>My Playlists</h3>
      {isEmpty ? (
        <p>you haven&apos;t created any playlist yet.</p>
      ) : (
        <div style={{ width: "400px" }}>
          {data?.map((page) =>
            page.items.map((playlist) => (
              <Playlist
                key={playlist.id}
                name={playlist.name}
                description={playlist.description}
                isPublic={playlist.isPublic}
                image={playlist.image}
              />
            ))
          )}
        </div>
      )}
      <div>
        <button disabled={isTheEnd} onClick={() => setSize((prev) => prev + 1)}>
          {isLoadingMore
            ? "loadding more..."
            : isTheEnd
            ? "no more playlists"
            : "show more"}
        </button>
      </div>
    </section>
  );
};

export default DiscoverArtists;
