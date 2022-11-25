import useSWR from "swr";

type Team = {
  title: string;
  flagUrl: string;
}

type Games = {
  id: string;
  date: string;
  teams: Team[];
  phase: {
    title: string;
  };
}

interface Data {
  games: Games[];
}

export const useGetAllGames = () => {
  const fetcher = (...args: any) => fetch(args).then(res => res.json())

  const { data, error } = useSWR<Data>(
    `/api/games`,
    fetcher,
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}
