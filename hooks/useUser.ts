import useSWR from "swr";
import { fetcher } from "./index";

interface useUser {
  data: {
    name: string;
    image: string;
  };
  isLoading: boolean;
  error: any;
}

export default function useUser(): useUser {
  const { data, error } = useSWR("/api/auth/user");

  return {
    data: data,
    isLoading: !data && !error,
    error: error,
  };
}
