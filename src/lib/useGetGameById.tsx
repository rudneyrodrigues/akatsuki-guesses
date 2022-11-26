import useSWR from "swr";

type Team = {
  id: string;
  title: string;
  flagUrl: string;
}

type Guess = {
  id: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  participant: {
    id: string;
    name: string;
    email: string;
  }
}

type GameData = {
  id: string;
  date: string;
  firstTeamPoints?: number;
  secondTeamPoints?: number;
  teams: Team[];
  guesses: Guess[];
}

type Data = {
  game: GameData;
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
