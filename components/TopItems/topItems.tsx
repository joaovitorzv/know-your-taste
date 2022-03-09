import topItems from "./topItems.module.scss";
import UserTopItems from "components/UserTopItems/userTopItems";

const TopItems = () => {
  return (
    <section className={topItems.topItems}>
      <UserTopItems type="topArtists" />
      <UserTopItems type="topTracks" />
    </section>
  );
};

export default TopItems;
