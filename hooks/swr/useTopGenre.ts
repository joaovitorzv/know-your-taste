import useSWR from "swr";

interface TopGenreResponse {
  topGenre: string;
}

export function useTopGenre() {
  const { data, error } = useSWR<TopGenreResponse>("/api/user/topGenre");

  const isLoading = !data && !error;
  return {
    isLoading,
    data,
  };
}
