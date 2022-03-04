import { SyntheticEvent, useRef, useState } from "react";
import styles from "./lists.module.css";

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

  const handleAudio = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
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
    parsedArtistsName.push(<span key={artist.id}>{nameWithColon}</span>);
    artistsNameAsTitle += " " + nameWithColon;
  });

  return (
    <div className={styles.list}>
      <div onClick={handlePlay} role="button" className={styles.linkButton}>
        <span
          className={styles.trackDuration}
          style={{ transform: `translateX(${playerBarWidth}%)` }}
        />
        {isPlaying ? <span>pau</span> : <span>play</span>}
      </div>
      <div className={styles.info}>
        <h5>{name}</h5>
        <div title={artistsNameAsTitle} className={styles.subInfo}>
          {parsedArtistsName}
        </div>
        {explicit && <p>Explicit</p>}
      </div>
      <div className={styles.audio}>
        <a href={external_urls.spotify} target="_blank" rel="noreferrer">
          Listen on spotify
        </a>
        <audio onTimeUpdate={(e) => handleAudio(e)} ref={trackPreviewRef}>
          <source src={preview_url} type="audio/mp3" />
        </audio>
      </div>
    </div>
  );
};

export default List;
