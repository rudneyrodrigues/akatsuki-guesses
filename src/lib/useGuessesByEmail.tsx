import useSWR from "swr";

type Teams = {
  title: string;
  flagUrl: string;
}

type Guesses = {
  id: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  game: {
    id: string;
    date: string;
    teams: Teams[];
  }
}

type UserGuessesData = {
  guesses: Guesses[];
}

export const useGuessesByEmail = (email: string) => {
  const fetcher = (...args: any) => fetch(args).then(res => res.json())

  const { data, error, mutate } = useSWR<UserGuessesData>(
    `/api/guesses/user/${email}`,
    fetcher,
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
