import { useTopItems } from "hooks/swr/useTopItems";

interface Props {
  type: "topArtists" | "topTracks";
}

const favorite = {
  topArtists: "artists",
  topTracks: "tracks",
};

const UserTopItems = ({ type }: Props) => {
  const { data, isLoading } = useTopItems(type);

  if (isLoading) return <p>loading...</p>;

  return (
    <section>
      <h2>Favorite {favorite[type]}</h2>
      <div>
        <ol>
          {data?.items.map((artist: any) => (
            <li key={artist.name}>{artist.name}</li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default UserTopItems;
