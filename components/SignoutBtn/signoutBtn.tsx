import { signOut } from "next-auth/react";
import router from "next/router";
import { useSWRConfig } from "swr";
import Button from "../Button";
import signoutBtn from "./signoutBtn.module.scss";

interface Props {
  userPicture: string;
}

const SignoutBtn = ({ userPicture }: Props) => {
  const { mutate } = useSWRConfig();

  async function handleSignOut() {
    const data = await signOut({ redirect: false, callbackUrl: "/" });

    router.push(data.url);
    mutate("/api/auth/user");
  }

  return (
    <div>
      <Button className={signoutBtn.btn} onClick={() => handleSignOut()}>
        <div className={signoutBtn.img}>
          <img src={userPicture} height={30} alt="user picture" />
        </div>
        Sair
      </Button>
    </div>
  );
};

export default SignoutBtn;
