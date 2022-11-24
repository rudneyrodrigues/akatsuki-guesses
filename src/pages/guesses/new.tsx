import useSWR from "swr";
import Head from "next/head";
import { GetStaticProps } from "next";
import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";

import { Sidebar } from "../../components/Sidebar";
import { NewGuess } from "../../components/Guesses/NewGuess";

const NewGuessPage = () => {
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
        <title>Novo palpite - Copa do Mundo 2022</title>
      </Head>

      <Flex flexDir="column" minH="calc(100vh - 5rem)">
        <Flex
          w="full"
          flex={1}
          as="main"
          mx="auto"
          maxW="container.xl"
          justify="space-between"
        >
          <NewGuess games={data?.games} />

          <Sidebar games={data?.games} />
        </Flex>
      </Flex>
    </>
  )
}

export default NewGuessPage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600, // one hour
  }
}
