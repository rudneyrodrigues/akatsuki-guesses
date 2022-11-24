import { Plus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Divider, Flex, Heading, Highlight, Icon, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { api } from '../../services/api';
import Link from 'next/link';
import useSWR from 'swr';
import { useGuessesByEmail } from '../../lib/useGuessesByEmail';

type Teams = {
  title: string;
  flagUrl: string;
}

type UserGuessesData = {
  id: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  game: {
    id: string;
    teams: Teams[];
  }
}

export const UserGuesses = (): JSX.Element => {
  const { data: session } = useSession();
  const { data, isError, isLoading } = useGuessesByEmail(session?.user.email);

  if (!session) {
    return (
      <Flex
        flex={1}
        align="center"
        justify="center"
        p="8"
        flexDir="column"
        gap="2"
      >
        <Heading size="lg">
          Faça login para continuar
        </Heading>

        <Text
          textAlign="center"
          fontSize="sm"
          color="gray.700"
          _dark={{
            color: 'gray.300',
          }}
        >
          Para visualizar seus palpites nos jogos, é necessário realizar o login na plataforma.
        </Text>
      </Flex>
    )
  }

  if (isError) {
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

  if (isLoading) {
    return (
      <Flex flex={1} minH="calc(100vh - 5rem)" align="center" justify="center">
        <Spinner size="xl" color="yellow" />
      </Flex>
    )
  }

  return (
    <VStack flex={1} w="full" spacing="8" p="8">
      <Flex
        gap="4"
        w="full"
        align="center"
        justify="space-between"
      >
        <Heading size="lg">
          Meus palpites
        </Heading>

        <Link href="/guesses/new">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={
              <Icon as={Plus} />
            }
          >
            Novo palpite
          </Button>
        </Link>
      </Flex>

      <Divider
        my="4"
        borderColor="gray.300"
        _dark={{
          borderColor: 'gray.800'
        }}
      />

      { data.guesses.length === 0 ? (
        <Text color="gray.700" _dark={{ color: 'gray.300' }}>
          Você ainda não registrou nenhum palpite
        </Text>
      ) : (
        <TableContainer w="full">
          <Table variant="simple">
            <TableCaption>
              Meus palpites na copa
            </TableCaption>

            <Thead>
              <Tr>
                <Th>Time 1</Th>
                <Th isNumeric>Gols</Th>
                <Th>Time 2</Th>
                <Th isNumeric>Gols</Th>
                {/* <Th>Data</Th> */}
              </Tr>
            </Thead>

            <Tbody>
              { data.guesses.map(guess => {
                return (
                  <Tr key={guess.id}>
                    <Td>
                      {guess.game.teams[0].title}
                    </Td>
                    <Td isNumeric>
                      {guess.firstTeamPoints}
                    </Td>
                    <Td>
                      {guess.game.teams[1].title}
                    </Td>
                    <Td isNumeric>
                      {guess.secondTeamPoints}
                    </Td>
                  </Tr>
                )
              }) }
            </Tbody>
          </Table>
        </TableContainer>
      ) }
    </VStack>
  )
}
