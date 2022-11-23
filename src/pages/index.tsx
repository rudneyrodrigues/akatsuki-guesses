import Head from "next/head";
import { GraphQLClient } from "graphql-request";
import { type GetStaticProps, type NextPage } from "next";
import { Flex, Text } from "@chakra-ui/react";

type Team = {
  title: string;
  flag: {
    url: string;
  }
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
  time: string;
  guesses: Guess[];
  teams: Team[];
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
        <Text>Ola mundo</Text>
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
          flag {
            url
          }
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
      }
    }
  `)

  const formattedGames = response.games.map((game: Game) => ({
    ...game,
    date: new Date(game.date).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    time: new Date(game.date).toLocaleTimeString('pt-BR', {
      hour: 'numeric',
      minute: '2-digit',
    })
  }))

  return {
    props: {
      games: formattedGames,
    },
    revalidate: 3600, // one hour
  }
}
