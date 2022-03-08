import Brand from "components/Brand/brand";
import SignoutBtn from "components/SignoutBtn/signoutBtn";
import { useTopItems } from "hooks/swr/useTopItems";
import { useSession } from "next-auth/react";

import header from "./header.module.scss";

const Header = () => {
  const session = useSession();
  const { data } = useTopItems("topArtists");

  if (session.status === "loading" || session.status === "unauthenticated")
    return null;

  return (
    <div className={header.container}>
      <div>
        <Brand />
      </div>
      <div className={header.userTaste}>
        <h2>
          {session.data?.user?.name} você ama ouvir {data?.items[0].genres[0]}
        </h2>
      </div>
      <nav>
        {session.data?.user?.image && (
          <SignoutBtn userPicture={session.data.user.image} />
        )}
      </nav>
    </div>
  );
};

export default Header;
