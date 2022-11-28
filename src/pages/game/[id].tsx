import Head from "next/head";
import { useRouter } from "next/router";
import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { useGetGameById } from "../../lib/useGetGameById";
import { GameGuesses } from "../../components/Guesses/GameGuesses";

const Game: NextPage = (): JSX.Element => {
  const fetcher = (...args: any) => fetch(args).then(res => res.json())

  // Get the game id from the url
  const { query } = useRouter();

  const { data, isError, isLoading } = useGetGameById(query.id as string,);

  if (isError) {
    return (
      <Flex
        minH="calc(100vh - 5rem)"
        align="center"
        justify="center"
        flexDir="column"
        gap="4"
        flex={1}
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

  if (isLoading) {
    return (
      <Flex flex={1} minH="calc(100vh - 5rem)" align="center" justify="center">
        <Spinner size="xl" color="yellow" />
      </Flex>
    )
  }

  return (
    <>
      <Head>
        <title>{data.game.teams[0].title} x {data.game.teams[1].title} - Copa do Mundo 2022</title>
      </Head>

      <GameGuesses game={data.game} />
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    // revalidate: 600, // Ten minutes
  }
}
