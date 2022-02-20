import { signOut } from "next-auth/react";
import router from "next/router";
import { useSWRConfig } from "swr";

const SignoutBtn = () => {
  const { mutate } = useSWRConfig();

  async function handleSignOut() {
    const data = await signOut({ redirect: false, callbackUrl: "/" });

    router.push(data.url);
    mutate("/api/auth/user");
  }

  return (
    <div>
      <button onClick={() => handleSignOut()}>logout</button>
    </div>
  );
};

export default SignoutBtn;
