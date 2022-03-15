import { useRef, useState } from "react";
import { BiLinkExternal as LinkIcon } from "react-icons/bi";
import {
  MdExplicit as ExplicitIcon,
  MdPauseCircleFilled as PauseIcon,
  MdPlayCircleFilled as PlayIcon,
} from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import * as Card from "../../components/Card";
import list from "./lists.module.scss";

interface ListProps {
  name: string;
  coverImage: string;
  explicit: boolean;
  artists: { name: string; id: string }[];
  preview_url: string;
  isPlayable: boolean;
  external_urls: {
    spotify: string;
  };
}

interface ListPropsLoading {
  isLoading: boolean;
}

function isLoading(
  props: ListProps | ListPropsLoading
): props is ListPropsLoading {
  return "isLoading" in props;
}

const List = (props: ListProps | ListPropsLoading) => {
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

  if (!isLoading(props)) {
    props.artists.map((artist, idx) => {
      const nameWithColon =
        artist.name + (idx !== props.artists.length - 1 ? "," : "");
      parsedArtistsName.push(
        <span key={artist.id} className={list.artistName}>
          {nameWithColon}
        </span>
      );
      artistsNameAsTitle += " " + nameWithColon;
    });
  }

  return isLoading(props) ? (
    <Card.Card className={list.playerContainer}>
      <Card.LeftHand className={list.player}>
        <Skeleton height={100} width={100} circle={true} />
      </Card.LeftHand>
      <Card.RightHand>
        <div className={list.info}>
          <h5>
            <Skeleton height={25} />
          </h5>
          <p>
            <Skeleton />
          </p>
        </div>
        <div className={list.external_url}>
          <Skeleton height={20} width={80} />
        </div>
      </Card.RightHand>
    </Card.Card>
  ) : (
    <Card.Card className={list.playerContainer}>
      <Card.LeftHand className={list.player}>
        <div onClick={handlePlay} role="button" className={list.play}>
          <img src={props.coverImage} height={70} width={70} alt={props.name} />
          <span
            className={list.trackDuration}
            style={{ transform: `translateX(${playerBarWidth}%)` }}
          />
          {isPlaying ? <PauseIcon size={30} /> : <PlayIcon size={30} />}
        </div>
      </Card.LeftHand>
      <Card.RightHand className={list.rightHand}>
        <div className={list.info}>
          <h5 title={props.name}>{props.name}</h5>
          <p title={artistsNameAsTitle}>{parsedArtistsName}</p>
          {props.explicit && <ExplicitIcon title="Explicit" size={15} />}
        </div>
        <div className={list.external_url}>
          <a
            href={props.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
          >
            Escutar no spotify <LinkIcon />
          </a>
          <audio onTimeUpdate={handleAudio} ref={trackPreviewRef}>
            <source src={props.preview_url} type="audio/mp3" />
          </audio>
        </div>
      </Card.RightHand>
    </Card.Card>
  );
};

export default List;
