import topItems from "./topItems.module.scss";
import UserTopItems from "components/UserTopItems/userTopItems";
import { useTopItems } from "hooks/swr/useTopItems";
import styles from "./userTopItems.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiUsers as FollowersIcon } from "react-icons/fi";
import { RiAlbumFill as AlbumIcon } from "react-icons/ri";

type Artists = {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
  followers: {
    total: number;
  };
}[];

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

const TopItems = () => {
  return (
    <section className={topItems.topItems}>
      <TopArtists />
    </section>
  );
};

export default TopItems;
