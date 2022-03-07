import SignoutBtn from "components/SignoutBtn/signoutBtn";
import { useTopItems } from "hooks/swr/useTopItems";
import { useSession } from "next-auth/react";
import Image from "next/image";

import header from "./header.module.scss";

const Header = () => {
  const session = useSession();
  const { data } = useTopItems("topArtists");

  if (session.status === "loading" || session.status === "unauthenticated")
    return null;

  return (
    <div className={header.container}>
      <h2>
        {session.data?.user?.name} você ama ouvir {data?.items[0].genres[0]}
      </h2>
      <Image
        src={session.data?.user?.image!}
        height={35}
        width={25}
        alt="user picture"
      />
      <SignoutBtn />
    </div>
  );
};

export default Header;
