import useSWR from "swr";

type PhasesData = {
  id: string;
  title: string;
}

type Data = {
  phases: PhasesData[];
}

export const useGetAllPhases = () => {
  const fetcher = (...args: any) => fetch(args).then(res => res.json())

  const { data, error } = useSWR<Data>(
    `/api/phases`,
    fetcher,
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}
