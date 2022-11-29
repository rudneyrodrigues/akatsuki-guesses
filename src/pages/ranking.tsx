import Head from "next/head";
import { type NextPage } from "next";
import { ArrowArcLeft } from "phosphor-react";
import { Button, Divider, Flex, Heading, Icon, Link, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";

import { useGetAllParticipants } from "../lib/useGetAllParticipants";

const Ranking: NextPage = (): JSX.Element => {
  const { data, isError, isLoading } = useGetAllParticipants();

  // Sort users by number of points
  data?.participants.sort((a, b) => {
    return b.guesses.reduce((acc, guess) => acc + guess.points, 0) - a.guesses.reduce((acc, guess) => acc + guess.points, 0);
  });

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
        <title>Ranking - Copa do Mundo 2022</title>
      </Head>

      <VStack flex={1} w="full" spacing="8" p="8">
        <Flex
          pt="4"
          gap="4"
          w="full"
          align="center"
          justify="space-between"
        >
          <Heading size="lg">
            Ranking de pontos
          </Heading>

          <Button
            as={Link}
            href="/"
            size="sm"
            variant="ghost"
            leftIcon={
              <Icon as={ArrowArcLeft} />
            }
          >
            Voltar
          </Button>
        </Flex>

        <Divider />

        <TableContainer w="full">
          <Table variant="simple">
            <TableCaption>
              Pontuação geral
            </TableCaption>

            <Thead>
              <Tr>
                <Th>Usuário</Th>
                <Th isNumeric>Quantidade de palpites</Th>
                <Th isNumeric>Pontuação total</Th>
              </Tr>
            </Thead>

            <Tbody>
              { data.participants.map( participant => (
                <Tr key={participant.id}>
                  <Td textTransform="capitalize">
                    {participant.name.toLocaleLowerCase()}
                  </Td>
                  <Td isNumeric>
                    {participant.guesses.length}
                  </Td>
                  <Td isNumeric>
                    {participant.guesses.reduce((acc, guess) => acc + guess.points, 0)}
                  </Td>
                </Tr>
              ) ) }
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </>
  )
}

export default Ranking;
