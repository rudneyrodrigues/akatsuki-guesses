import useSWR from 'swr';
import Head from "next/head";
import { type GetStaticProps, type NextPage } from "next";
import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";

import { Sidebar } from "../components/Sidebar";
import { UserGuesses } from "../components/Guesses/UserGuesses";

const Home: NextPage = (): JSX.Element => {
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
        <title>Bolão da Akatsuki - Copa do Mundo 2022</title>
      </Head>

      <Flex as="main" maxW="container.xl" mx="auto" minH="calc(100vh - 5rem)">
        <UserGuesses />

        <Sidebar />
      </Flex>
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
