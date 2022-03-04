import Button from "components/Button";
import Modal from "components/Modal/modal";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import * as Card from "../../Card";
import type { UserPlaylists } from "./myPlaylists";

import { MdLock as PrivateIcon, MdPublic as PublicIcon } from "react-icons/md";

import playlist from "./playlist.module.scss";

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
    <div className={playlist.container}>
      <Card.Card>
        <Card.Image>
          <img src={images[0].url} alt={`${name}\'s cover`} />
        </Card.Image>

        <Card.Content>
          <div className={playlist.info}>
            <h5>{name}</h5>
            <p>{description}</p>
            <span>
              made by {owner.display_name}
              {isPublic ? (
                <PublicIcon title="public" />
              ) : (
                <PrivateIcon title="private" />
              )}
            </span>
          </div>
          <div>
            {isOwner && (
              <Button onClick={() => setIsModalOpen(true)}>Rename</Button>
            )}
          </div>
        </Card.Content>
      </Card.Card>
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
    </div>
  );
};

export default Playlist;