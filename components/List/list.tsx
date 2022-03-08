import { SyntheticEvent, useRef, useState } from "react";
import list from "./lists.module.scss";
import * as Card from "../../components/Card";
import {
  MdPauseCircleFilled as PauseIcon,
  MdPlayCircleFilled as PlayIcon,
  MdExplicit as ExplicitIcon,
} from "react-icons/md";
import { BiLinkExternal as LinkIcon } from "react-icons/bi";

interface Props {
  name: string;
  explicit: boolean;
  artists: { name: string; id: string }[];
  preview_url: string;
  isPlayable: boolean;
  external_urls: {
    spotify: string;
  };
}

const List = ({
  name,
  artists,
  explicit,
  preview_url,
  isPlayable,
  external_urls,
}: Props) => {
  const trackPreviewRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    if (!trackPreviewRef.current) return;

    if (isPlaying) {
      setIsPlaying(false);
      trackPreviewRef.current.pause();
    } else {
      setIsPlaying(true);
      trackPreviewRef.current.play();
    }
  };

  const [playerBarWidth, setPlayerBarWith] = useState(0);

  const handleAudio = () => {
    if (trackPreviewRef.current) {
      setPlayerBarWith(
        Math.floor((trackPreviewRef.current?.currentTime / 30) * 100)
      );
    }
  };

  const parsedArtistsName: JSX.Element[] = [];
  var artistsNameAsTitle = "";

  artists.map((artist, idx) => {
    const nameWithColon = artist.name + (idx !== artists.length - 1 ? "," : "");
    parsedArtistsName.push(
      <span key={artist.id} className={list.artistName}>
        {nameWithColon}
      </span>
    );
    artistsNameAsTitle += " " + nameWithColon;
  });

  return (
    <Card.Card className={list.playerContainer}>
      <Card.LeftHand className={list.player}>
        <div onClick={handlePlay} role="button" className={list.play}>
          <span
            className={list.trackDuration}
            style={{ transform: `translateX(${playerBarWidth}%)` }}
          />
          {isPlaying ? <PauseIcon size={30} /> : <PlayIcon size={30} />}
        </div>
      </Card.LeftHand>
      <Card.RightHand>
        <div className={list.info}>
          <h5 title={name}>{name}</h5>
          <p title={artistsNameAsTitle}>{parsedArtistsName}</p>
          {explicit && <ExplicitIcon title="Explicit" size={15} />}
        </div>
        <div className={list.external_url}>
          <a href={external_urls.spotify} target="_blank" rel="noreferrer">
            Escutar no spotify <LinkIcon />
          </a>
          <audio onTimeUpdate={handleAudio} ref={trackPreviewRef}>
            <source src={preview_url} type="audio/mp3" />
          </audio>
        </div>
      </Card.RightHand>
    </Card.Card>
  );
};

export default List;
