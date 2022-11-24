import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import { GraphQLClient } from "graphql-request";
import { GetStaticProps, NextPage } from "next";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { NewGuess } from "../../components/Guesses/NewGuess";

type Team = {
  title: string;
  flagUrl: string;
}

type Game = {
  id: string;
  date: string;
  teams: Team[];
  phase: {
    title: string;
  };
}

interface NewGuessPageProps {
  games: Game[];
}

const NewGuessPage: NextPage<NewGuessPageProps> = ({
  games
}: NewGuessPageProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Novo palpite - Copa do Mundo 2022</title>
      </Head>

      <Flex flexDir="column" minH="100vh">
        <Header />

        <Flex
          w="full"
          flex={1}
          as="main"
          mx="auto"
          maxW="container.xl"
          justify="space-between"
        >
          <NewGuess games={games} />

          <Sidebar games={games} />
        </Flex>
      </Flex>
    </>
  )
}

export default NewGuessPage;

export const getStaticProps: GetStaticProps = async () => {
  const graphql = new GraphQLClient(String(process.env.HYGRAPH_CONTENT_API));

  const response = await graphql.request(`
    query GetAllGames {
      games(orderBy: date_ASC) {
        id
        date
        teams {
          title
          flagUrl
        }
        phase {
          title
        }
      }
    }
  `)

  return {
    props: {
      games: response.games,
    },
    revalidate: 3600, // one hour
  }
}
