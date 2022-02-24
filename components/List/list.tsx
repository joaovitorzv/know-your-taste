interface Props {
  name: string;
  explicit: boolean;
  artists: { name: string; id: string }[];
  preview_url: string;
}

const List = ({ name, artists, explicit, preview_url }: Props) => {
  return (
    <div>
      <h5>{name}</h5>
      <div>
        {artists.map((artist) => (
          <span key={artist.id}>{artist.name}</span>
        ))}
      </div>
      <p>{explicit}</p>
    </div>
  );
};

export default List;
