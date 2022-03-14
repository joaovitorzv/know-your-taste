import Brand from "components/Brand/brand";
import SignoutBtn from "components/SignoutBtn/signoutBtn";
import { useTopItems } from "hooks/swr/useTopItems";
import { useSession } from "next-auth/react";

import header from "./header.module.scss";

interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  const session = useSession();
  const { data } = useTopItems("topArtists");

  if (session.status === "loading" || session.status === "unauthenticated")
    return (
      <div className={`${header.container} ${className}`}>
        <div style={{ textAlign: "center" }}>
          <Brand />
        </div>
      </div>
    );

  return (
    <header className={`${header.container} ${className}`}>
      <div className={header.brand}>
        <Brand />
      </div>
      <div className={header.userTaste}>
        <h2>
          {session.data?.user?.name} você ama ouvir {data?.items[0].genres[0]}
        </h2>
      </div>
      <div className={header.sessionActions}>
        {session.data?.user?.image && (
          <SignoutBtn userPicture={session.data.user.image} />
        )}
      </div>
    </header>
  );
};

export default Header;
