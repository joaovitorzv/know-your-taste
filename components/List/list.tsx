interface Props {
  name: string;
  explicit: boolean;
  artists: { name: string; id: string }[];
  preview_url: string;
  external_urls: {
    spotify: string;
  };
}

const List = ({
  name,
  artists,
  explicit,
  preview_url,
  external_urls,
}: Props) => {
  return (
    <div>
      <h5>{name}</h5>
      <div>
        {artists.map((artist) => (
          <span key={artist.id}>{artist.name}</span>
        ))}
      </div>
      {explicit && <p>Explicit</p>}
      <audio controls>
        <source src={preview_url} type="audio/mp3" />
      </audio>
      <a href={external_urls.spotify} target="_blank" rel="noreferrer">
        listen on spotify
      </a>
    </div>
  );
};

export default List;
