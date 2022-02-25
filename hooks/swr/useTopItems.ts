import useSWR from "swr";

interface UserTopTracksResponse {
  items: {
    id: string;
    name: string;
    images: { height: number; width: number; url: string }[];
    genres: string[];
  }[];
}

interface UserTopArtistsResponse {
  items: {
    id: string;
    name: string;
    images: { height: number; width: number; url: string }[];
    genres: string[];
  }[];
}

export function useTopItems(type: "topArtists" | "topTracks") {
  const { data, error } = useSWR<UserTopItemsResponse>(`/api/user/${type}`);

  const isLoading = !data && !error;
  return {
    isLoading,
    data,
  };
}
