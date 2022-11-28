import useSWR from "swr";

type Game = {
  firstTeamPoints: number;
  secondTeamPoints: number;
}

type Guess = {
  id: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  game: Game;
  points: number;
}

type Participants = {
  id: string;
  name: string;
  email: string;
  guesses: Guess[]
}

interface Data {
  participants: Participants[]
}

export const useGetAllParticipants = () => {
  const fetcher = (...args: any) => fetch(args).then(res => res.json())

  const { data, error } = useSWR<Data>(
    `/api/users`,
    fetcher,
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}
