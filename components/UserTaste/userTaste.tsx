import { useTopItems } from "hooks/swr/useTopItems";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import userTaste from "./userTaste.module.scss";

const UserTaste = () => {
  const session = useSession();
  const { data, isLoading } = useTopItems("topArtists");

  if (isLoading) {
    return (
      <div className={userTaste.container}>
        <Skeleton width="60%" height={40} />;
      </div>
    );
  }

  return (
    <div className={userTaste.container}>
      <h2>
        {session.data?.user?.name} seu gênero favorito é{" "}
        {data?.items[0].genres[0]}
      </h2>
    </div>
  );
};

export default UserTaste;
