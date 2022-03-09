import { useTopItems } from "hooks/swr/useTopItems";
import styles from "./userTopItems.module.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
          <h2>
            <Skeleton duration={2} className={styles.headerSkeleton} />
          </h2>
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
        {data?.items.map((artist: any) => (
          <li key={artist.name}>{artist.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default UserTopItems;
