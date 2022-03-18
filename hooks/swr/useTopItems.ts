import useSWR from "swr";

interface TopTracksResponse {
  items: {
    id: string;
    name: string;
    images: { height: number; width: number; url: string }[];
    genres: string[];
  }[];
}

interface TopArtistsResponse {
  items: {
    id: string;
    name: string;
    images: {
      url: string;
    }[];
    followers: {
      total: number;
    };
  }[];
}

type TopItemsType = "topArtists" | "topTracks";

type UseTopItems<T extends TopItemsType> = T extends "topArtists"
  ? TopArtistsResponse
  : T extends "topTracks"
  ? TopTracksResponse
  : never;

export function useTopItems<T extends TopItemsType>(type: T) {
  const { data, error } = useSWR<UseTopItems<T>>(`/api/user/${type}`);
  const isLoading = !data && !error;

  return {
    isLoading,
    data,
  };
}
