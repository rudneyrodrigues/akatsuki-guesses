import useSWR from "swr";

type TeamsData = {
  id: string;
  title: string;
  flagUrl: string;
}

type GamesData = {
  id: string;
  date: string;
  teams: TeamsData[];
}

type Data = {
  game: GamesData;
}

export const useGetGameById = (id: string) => {
  const fetcher = (...args: any) => fetch(args).then(res => res.json())

  const { data, error } = useSWR<Data>(
    `/api/games/${id}`,
    fetcher,
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}
