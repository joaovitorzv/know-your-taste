import { MdInfo as InfoIcon } from "react-icons/md";

import topItems from "./topItems.module.scss";
import UserTopItems from "components/UserTopItems/userTopItems";
import * as Info from "components/Popover/popover";

const TopItems = () => {
  return (
    <section className={topItems.topItems}>
      <UserTopItems type="topArtists" />
      <UserTopItems type="topTracks" />
      <Info.Pophover>
        <Info.Popicon>
          <InfoIcon size={18} />
        </Info.Popicon>
        <Info.Popover>
          <span>Top items</span>
          <p>Raking baseado na sua atividade recente no spotify.</p>
        </Info.Popover>
      </Info.Pophover>
    </section>
  );
};

export default TopItems;
