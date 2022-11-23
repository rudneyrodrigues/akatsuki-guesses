import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";
import { GraphQLClient } from "graphql-request";
import { type GetStaticProps, type NextPage } from "next";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

type Team = {
  title: string;
  flagUrl: string;
}

type Guess = {
  id: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  participant: {
    name: string;
    email: string;
  };
}

type Game = {
  id: string;
  date: string;
  guesses: Guess[];
  teams: Team[];
  phase: {
    title: string;
  };
}

interface HomeProps {
  games: Game[];
}

const Home: NextPage<HomeProps> = ({ games }: HomeProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Bolão da Akatsuki - Copa do Mundo 2022</title>
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
          <Text>Ola mundo</Text>

          <Sidebar games={games} />
        </Flex>
      </Flex>
    </>
  )
}

export default Home;

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
        guesses {
          id
          firstTeamPoints
          secondTeamPoints
          participant {
            name
            email
          }
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
