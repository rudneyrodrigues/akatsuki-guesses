import { GoogleLogo } from 'phosphor-react';

export const Header = (): JSX.Element => {
  return (
    <div className="h-20 bg-zinc-800 border-b border-zinc-700 px-4">
      <div className="w-full max-w-screen-lg mx-auto h-20 flex items-center justify-between gap-4">
        <h1 className="font-title font-bold text-2xl">
          Copa do Mundo 2022
        </h1>

        <button className="h-12 px-8 flex items-center gap-2 text-base font-bold text-white bg-zinc-700 rounded-full transition-colors hover:bg-zinc-600 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:text-yellow-500">
          <GoogleLogo size={24} weight="bold" />

          Entrar com o Google
        </button>
      </div>
    </div>
  )
}
