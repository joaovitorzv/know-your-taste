import useSWR from "swr";
import type { UserPlaylists } from "./myPlaylists";

const Playlist = ({
  isPublic,
  description,
  name,
  image,
}: Omit<UserPlaylists, "id">) => {
  return (
    <div style={{ display: "inline-flex" }}>
      <h4>{name}</h4>
      <p>{description}</p>
      <span>{isPublic ? "public" : "private"}</span>
      <button onClick={() => {}}>Delete playlist</button>
    </div>
  );
};

export default Playlist;
