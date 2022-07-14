import Button from "components/Button";
import Skeleton from "react-loading-skeleton";
import { KeyedMutator } from "swr";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import Playlist from "./Playlist/playlist";
import playlists from "./playlists.module.scss";

export interface UserPlaylists {
  id: string;
  name: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  owner: {
    display_name: string;
  };
  isPublic: boolean;
  description: string;
  getKey: SWRInfiniteKeyLoader;
  mutate: KeyedMutator<PlaylistsResponse[]>;
}
// 'public' is a reserved word in strict mode
// but in spotify request returns a 'public' field
interface UserPlaylistsResponse extends Omit<UserPlaylists, "isPublic"> {
  public: boolean;
}

interface PlaylistsResponse {
  items: UserPlaylistsResponse[];
  next: string;
  limit: number;
  offset: number;
  total: number;
}

const PAGE_LIMIT = 5;

const getKey: SWRInfiniteKeyLoader = (pageIndex, prevData) => {
  if (prevData && !prevData.next) return null;
  if (pageIndex === 0) return `/api/user/playlists?limit=${PAGE_LIMIT}`;

  return `/api/user/playlists?next=${prevData.next}`;
};

const MyPlaylistsSkeleton = () => {
  return (
    <div className={playlists.container}>
      <header>
        <h2>Minhas Playlists</h2>
      </header>
      <div>
        <Skeleton height={90} style={{ marginTop: "1em" }} />
        <Skeleton height={90} style={{ marginTop: "1em" }} />
        <Skeleton height={90} style={{ marginTop: "1em" }} />
        <Skeleton height={90} style={{ marginTop: "1em" }} />
        <Skeleton height={90} style={{ marginTop: "1em" }} />
      </div>
    </div>
  );
};

const MyPlaylists = () => {
  const { data, error, setSize, size, mutate } =
    useSWRInfinite<PlaylistsResponse>(getKey);

  const isLoading = !data && !error;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.length === 0;
  const isTheEnd = isEmpty || (data && data[data.length - 1].next === null);

  if (error) return <p>something bad happened!</p>;
  if (isLoading) return <MyPlaylistsSkeleton />;
  return (
    <div className={playlists.container}>
      <header>
        <h2>Minhas Playlists</h2>
      </header>
      {isEmpty ? (
        <p>você não criou nenhuma playlist ainda.</p>
      ) : (
        <div className={playlists.playlists}>
          {data?.map((page) =>
            page.items.map((playlist) => (
              <Playlist
                key={playlist.id}
                id={playlist.id}
                name={playlist.name}
                description={playlist.description}
                isPublic={playlist.public}
                owner={playlist.owner}
                images={playlist.images}
                getKey={getKey}
                mutate={mutate}
              />
            ))
          )}
          <div className={playlists.load}>
            <Button
              disabled={isTheEnd}
              onClick={() => setSize((prev) => prev + 1)}
            >
              {isLoadingMore
                ? "carregando mais..."
                : isTheEnd
                ? "nada para carregar"
                : "mostrar mais"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlaylists;
