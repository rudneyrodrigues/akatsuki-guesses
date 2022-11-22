import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Bolão da Akatsuki - Copa do Mundo 2022</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <h1 className="text-2xl font-bold font-title">Ola mundo</h1>
      </div>
    </>
  )
}

export default Home;
