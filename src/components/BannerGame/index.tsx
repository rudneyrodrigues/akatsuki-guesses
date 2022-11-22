import Image from "next/image";

type Team = {
  title: string;
  flag: {
    url: string;
  }
}

interface BannerGameProps {
  id: string;
  date: string;
  time: string;
  teams: Team[];
}

export const BannerGame = ({
  id,
  date,
  time,
  teams,
}: BannerGameProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center bg-zinc-800 p-8 rounded">
      <header className="flex items-center gap-4">
        <Image
          src={teams[0].flag.url}
          alt={teams[0].title}
          width={80}
          height={80}
          className="rounded"
        />

        <span className="text-zinc-300">
          vs.
        </span>

        <Image
          src={teams[1].flag.url}
          alt={teams[1].title}
          width={80}
          height={80}
          className="rounded"
        />
      </header>

      <span className="text-zinc-100 text-lg mt-2 font-bold">
        {teams[0].title} x {teams[1].title}
      </span>

      <footer className="mt-4">
        <time className="text-sm text-zinc-300">
          { date } às { time }
        </time>
      </footer>
    </div>
  )
}
