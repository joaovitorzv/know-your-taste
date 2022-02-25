import Modal from "components/Modal/modal";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { UserPlaylists } from "./myPlaylists";

const Playlist = ({
  id,
  isPublic,
  description,
  name,
  image,
  mutate,
}: UserPlaylists) => {
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const [formError, setFormError] = useState<string | boolean>(false);
  const [formLoading, setFormLoading] = useState(false);
  const [playlistName, setPlaylistName] = useState<string | null>(null);
  const handlePlaylistRename = async (e: FormEvent<HTMLFormElement>) => {
    setFormLoading(true);
    e.preventDefault();
    if (!playlistName || playlistName.length <= 0) {
      setFormError("Your playlist name can't be empty.");
      return;
    }

    const requestBody = {
      name: playlistName,
    };

    try {
      const response = await fetch(`/api/user/playlists?id=${id}`, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data) {
        mutate();
        setFormLoading(false);
        setIsOpen(false);
      }
    } catch (e) {
      setFormError("An error ocurred.");
    }
  };

  return (
    <>
      <div style={{ display: "inline-flex" }}>
        <h5>{name}</h5>
        <p>{description}</p>
        <span>{isPublic ? "public" : "private"}</span>
        <button onClick={() => setIsOpen(true)}>Rename</button>
      </div>
      <Modal toggle={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
        <h5>{name}</h5>
        <p>{description}</p>
        <form onSubmit={(e) => handlePlaylistRename(e)}>
          {formError && <p style={{ color: "red" }}>{formError}</p>}
          <input
            ref={inputRef}
            placeholder="new name"
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <button onClick={() => setIsOpen(false)}>cancel</button>
          <button type="submit">{formLoading ? "loading..." : "save"}</button>
        </form>
      </Modal>
    </>
  );
};

export default Playlist;
