import useUser from "hooks/useUser";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Header = () => {
  const session = useSession();

  if (session.status === "loading" || session.status === "unauthenticated")
    return null;

  return (
    <div>
      <p>{session.data?.user?.name}</p>{" "}
      <Image
        src={session.data?.user?.image!}
        height={35}
        width={25}
        alt="user picture"
      />
    </div>
  );
};

export default Header;
