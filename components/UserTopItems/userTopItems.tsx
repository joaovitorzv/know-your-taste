import { useTopItems } from "hooks/swr/useTopItems";
import styles from "./userTopItems.module.scss";

interface Props {
  type: "topArtists" | "topTracks";
}

const favorite = {
  topArtists: "artistas",
  topTracks: "músicas",
};

const UserTopItems = ({ type }: Props) => {
  const { data, isLoading } = useTopItems(type);

  if (isLoading) return <p>loading...</p>;

  return (
    <section className={styles.container}>
      <header>
        <h2>Top {favorite[type]}</h2>
      </header>
      <ol className={styles.list}>
        {data?.items.map((artist: any) => (
          <li key={artist.name}>{artist.name}</li>
        ))}
      </ol>
    </section>
  );
};

export default UserTopItems;
