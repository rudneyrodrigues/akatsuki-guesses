import useSWR from "swr";
import Head from "next/head";
import { GraphQLClient } from "graphql-request";
import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Sidebar } from "../../components/Sidebar";
import { GameGuesses } from "../../components/Guesses/GameGuesses";

type Team = {
  id: string;
  title: string;
  flagUrl: string;
}

type Guess = {
  id: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  participant: {
    id: string;
    name: string;
    email: string;
  }
}

type GameData = {
  id: string;
  date: string;
  firstTeamPoints?: number;
  secondTeamPoints?: number;
  teams: Team[];
  guesses: Guess[];
}

interface GameProps {
  game: GameData;
}

const Game: NextPage = ({ game }: GameProps): JSX.Element => {
  const fetcher = (...args: any) => fetch(args).then(res => res.json())

  const { data, error } = useSWR("/api/games", fetcher);

  if (error) {
    return (
      <Flex
        minH="calc(100vh - 5rem)"
        align="center"
        justify="center"
        flexDir="column"
        gap="4"
      >
        <Heading>
          Erro ao carregar dados do servidor
        </Heading>
        <Text color="gray.700" _dark={{ color: 'gray.300' }}>
          Entre em contato com o Administrado para verificar o problema
        </Text>
      </Flex>
    )
  }

  if (!data) {
    return (
      <Flex minH="calc(100vh - 5rem)" align="center" justify="center">
        <Spinner size="xl" color="yellow" />
      </Flex>
    )
  }

  return (
    <>
      <Head>
        <title>{game.teams[0].title} x {game.teams[1].title} - Copa do Mundo 2022</title>
      </Head>

      <Flex as="main" maxW="container.xl" mx="auto" minH="calc(100vh - 5rem)">
        <GameGuesses game={game} />

        <Sidebar />
      </Flex>
    </>
  )
}

export default Game;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  const graphql = new GraphQLClient(String(process.env.HYGRAPH_CONTENT_API));

  const data = await graphql.request(`
    query GetGameById($id: ID!) {
      game(where: {id: $id}) {
        id
        date
        firstTeamPoints
        secondTeamPoints
        teams {
          id
          title
          flagUrl
        }
        guesses(orderBy: createdAt_ASC) {
          id
          firstTeamPoints
          secondTeamPoints
          participant {
            id
            name
            email
          }
        }
      }
    }
  `, {
    id,
  });

  const formattedGame = {
    ...data.game,
    date: new Date(data.game.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }

  return {
    props: {
      game: formattedGame,
    },
    revalidate: 600, // Ten minutes
  }
}
