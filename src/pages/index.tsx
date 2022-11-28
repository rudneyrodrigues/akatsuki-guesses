import Head from "next/head";
import { type GetStaticProps, type NextPage } from "next";

import { UserGuesses } from "../components/Guesses/UserGuesses";

const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Bolão da Akatsuki - Copa do Mundo 2022</title>
      </Head>

      <UserGuesses />
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
