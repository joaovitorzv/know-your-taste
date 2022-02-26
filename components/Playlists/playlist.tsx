import Modal from "components/Modal/modal";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { UserPlaylists } from "./myPlaylists";

const Playlist = ({
  id,
  isPublic,
  description,
  name,
  mutate,
  images,
  owner,
}: UserPlaylists) => {
  const session = useSession();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (session.data && session.data.user?.name === owner.display_name)
      setIsOwner(true);
  }, [owner, session]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const renameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalOpen && renameInput.current) {
      renameInput.current.focus();
    }
  }, [isModalOpen]);

  const [formError, setFormError] = useState<string | boolean>(false);
  const [formLoading, setFormLoading] = useState(false);
  const [renameInputValue, setRenameInputValue] = useState<string | null>(null);

  const handlePlaylistRename = async (e: FormEvent<HTMLFormElement>) => {
    setFormLoading(true);
    e.preventDefault();

    if (!renameInputValue || renameInputValue.length <= 0) {
      setFormError("Your playlist name can't be empty.");
      return;
    }

    const requestBody = { name: renameInputValue };

    try {
      const renameResponse = await fetch(`/api/user/playlists?id=${id}`, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      const sucessRename = await renameResponse.json();
      if (sucessRename) {
        mutate();
        setFormLoading(false);
        setIsModalOpen(false);
      }
    } catch (e) {
      setFormError("An error ocurred.");
    }
  };

  return (
    <>
      <div style={{ display: "inline-flex" }}>
        <img
          src={images[0].url}
          height={70}
          width={70}
          alt={`${name}\'s cover`}
        />
        <h5>{name}</h5>
        <p>{description}</p>
        <span>{isPublic ? "public" : "private"}</span>
        {isOwner && (
          <button onClick={() => setIsModalOpen(true)}>Rename</button>
        )}
      </div>
      <Modal
        toggle={() => setIsModalOpen((prev) => !prev)}
        isOpen={isModalOpen}
      >
        <h5>{name}</h5>
        <p>{description}</p>
        <form onSubmit={(e) => handlePlaylistRename(e)}>
          {formError && <p style={{ color: "red" }}>{formError}</p>}
          <input
            ref={renameInput}
            placeholder="new name"
            onChange={(e) => setRenameInputValue(e.target.value)}
          />
          <button onClick={() => setIsModalOpen(false)}>cancel</button>
          <button type="submit">{formLoading ? "loading..." : "save"}</button>
        </form>
      </Modal>
    </>
  );
};

export default Playlist;
