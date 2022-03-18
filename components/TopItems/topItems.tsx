import topItems from "./topItems.module.scss";
import { useTopItems } from "hooks/swr/useTopItems";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiUsers as FollowersIcon } from "react-icons/fi";
import { RiAlbumFill as AlbumIcon } from "react-icons/ri";

const TopArtists = () => {
  const { data: artists, isLoading } = useTopItems("topArtists");

  if (!artists || isLoading) {
    return <Skeleton />;
  }

  return (
    <div className={topItems.container}>
      <header>
        <h2>Artists Favoritos</h2>
      </header>
      <ol className={topItems.list}>
        {artists.items.map((artist) => (
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
        ))}
      </ol>
    </div>
  );
};

const TopTracks = () => {
  const { data: tracks, isLoading } = useTopItems("topTracks");

  if (!tracks || isLoading) {
    return <Skeleton />;
  }

  return (
    <div className={topItems.container}>
      <header>
        <h2>Músicas Favoritas</h2>
      </header>
      <ol className={topItems.list}>
        {tracks.items.map((track: any) => (
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
        ))}
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
