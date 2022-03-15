import { useTopItems } from "hooks/swr/useTopItems";
import styles from "./userTopItems.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiUsers as FollowersIcon } from "react-icons/fi";
import { RiAlbumFill as AlbumIcon } from "react-icons/ri";

interface Props {
  type: "topArtists" | "topTracks";
}

const favorite = {
  topArtists: "artistas",
  topTracks: "músicas",
};

const UserTopItems = ({ type }: Props) => {
  const { data, isLoading } = useTopItems(type);
  if (isLoading)
    return (
      <div className={styles.container}>
        <header>
          <h2>Top {favorite[type]}</h2>
        </header>
        <ol className={styles.list}>
          <Skeleton style={{ marginTop: "1em" }} height={30} count={5} />
        </ol>
      </div>
    );

  return (
    <div className={styles.container}>
      <header>
        <h2>Top {favorite[type]}</h2>
      </header>
      <ol className={styles.list}>
        {type === "topArtists"
          ? data?.items.map((artist: any) => (
              <li key={artist.name}>
                <div className={styles.artistListContainer}>
                  <img src={artist.images[0].url} alt={artist.name} />
                  <div className={styles.artistList}>
                    <p title={artist.name}>{artist.name}</p>
                    <span>
                      <FollowersIcon />{" "}
                      {new Intl.NumberFormat("pt-BR").format(
                        artist.followers.total
                      )}{" "}
                      followers
                    </span>
                  </div>
                </div>
              </li>
            ))
          : data?.items.map((track: any) => (
              <li key={track.name}>
                <div className={styles.artistListContainer}>
                  <img src={track.album.images[0].url} alt={track.name} />
                  <div className={styles.artistList}>
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

export default UserTopItems;
