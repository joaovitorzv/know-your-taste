import useSWR from "swr";

interface Props {
  type: "tracks" | "artists";
}

interface UserTopItemsResponse {
  items: {
    name: string;
    images: { height: number; width: number; url: string }[];
  }[];
}

const UserTopItems = ({ type }: Props) => {
  const { data, error } = useSWR<UserTopItemsResponse>(
    `/api/user/top?type=${type}`
  );

  if (!data && !error) return <p>loading...</p>;
  if (error) return <p>something bad happened.</p>;

  return (
    <section>
      <h2>Favorite {type}</h2>
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
