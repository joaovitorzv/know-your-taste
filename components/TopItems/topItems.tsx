import { useTopItems } from "hooks/swr/useTopItems";
import { ReactElement } from "react";
import { FiUsers as FollowersIcon } from "react-icons/fi";
import { RiAlbumFill as AlbumIcon } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import topItems from "./topItems.module.scss";

interface ListItemSkeletonWrapperProps {
  count: number;
}

const ListItemSkeleton = ({ count }: ListItemSkeletonWrapperProps) => {
  const listItem = (
    <li>
      <div className={topItems.artistListContainer}>
        <Skeleton height={50} width={50} />
        <div className={topItems.artistList} style={{ paddingLeft: "10px" }}>
          <Skeleton height={15} width={150} />
          <span style={{ marginTop: "10px" }}>
            <Skeleton height={10} width={70} />
          </span>
        </div>
      </div>
    </li>
  );
  const listItemsSkeleton: JSX.Element[] = [];

  for (let i = 0; i < count; i++) listItemsSkeleton.push(listItem);

  return <>{listItemsSkeleton}</>;
};

const TopArtists = () => {
  const { data: artists, isLoading } = useTopItems("topArtists");

  return (
    <div className={topItems.container}>
      <header>
        <h2>Artistas Favoritos</h2>
      </header>
      <ol className={topItems.list}>
        {!artists || isLoading ? (
          <ListItemSkeleton count={5} />
        ) : (
          artists.items.map((artist) => (
            <li key={artist.id}>
              <div className={topItems.artistListContainer}>
                <img src={artist.images[0].url} alt={artist.name} />
                <div className={topItems.artistList}>
                  <p title={artist.name}>{artist.name}</p>
                  <span>
                    <FollowersIcon />
                    {new Intl.NumberFormat("pt-BR").format(
                      artist.followers.total
                    )}{" "}
                    seguidores
                  </span>
                </div>
              </div>
            </li>
          ))
        )}
      </ol>
    </div>
  );
};

const TopTracks = () => {
  const { data: tracks, isLoading } = useTopItems("topTracks");

  return (
    <div className={topItems.container}>
      <header>
        <h2>Músicas Favoritas</h2>
      </header>
      <ol className={topItems.list}>
        {!tracks || isLoading ? (
          <ListItemSkeleton count={5} />
        ) : (
          tracks.items.map((track: any) => (
            <li key={track.name}>
              <div className={topItems.artistListContainer}>
                <img src={track.album.images[0].url} alt={track.name} />
                <div className={topItems.artistList}>
                  <p title={track.name}>{track.name}</p>
                  <span>
                    <AlbumIcon /> {track.album.name}
                  </span>
                </div>
              </div>
            </li>
          ))
        )}
      </ol>
    </div>
  );
};

const TopItems = () => {
  return (
    <section className={topItems.topItems}>
      <TopArtists />
      <TopTracks />
    </section>
  );
};

export default TopItems;
