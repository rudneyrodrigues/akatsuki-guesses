import Link from 'next/link';
import { Plus } from 'phosphor-react';
import { Button, Divider, Flex, Heading, Icon, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';

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

interface GameGuessesProps {
  game: GameData;
}

export const GameGuesses = ({ game }: GameGuessesProps): JSX.Element => {
  return (
    <VStack flex={1} w="full" spacing="8" p="8">
      <Flex
        gap="4"
        w="full"
        align="center"
        justify="space-between"
      >
        <Heading size="lg">
          {game.teams[0].title} x {game.teams[1].title}
        </Heading>

        <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.300' }}>
          {game.date}
        </Text>
      </Flex>

      <Divider
        my="4"
        borderColor="gray.300"
        _dark={{
          borderColor: 'gray.800'
        }}
      />

      <TableContainer w="full">
        <Table variant="simple">
          <TableCaption>
            Palpites do jogo
          </TableCaption>

          <Thead>
            <Tr>
              <Th>Usuário</Th>
              <Th isNumeric>{game.teams[0].title}</Th>
              <Th isNumeric>{game.teams[1].title}</Th>
            </Tr>
          </Thead>

          <Tbody>
            { game.guesses.length <= 0 && (
              <Tr>
                <Td colSpan={5} textAlign="center">
                  <Text color="gray.700" _dark={{ color: 'gray.300' }}>
                    Nenhum palpite foi feito para esse jogo
                  </Text>
                </Td>
              </Tr>
            ) }

            { game.guesses.map(guess => {
              return (
                <Tr key={guess.id}>
                  <Td>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      {
                        // Get first and last name
                        // guess.participant.name.split(' ').slice(0, 2).join(' ').toLocaleLowerCase()
                        guess.participant.name.toLocaleLowerCase()
                      }
                    </Text>
                    <Text
                      fontSize="xs"
                      fontWeight="normal"
                      color="gray.700"
                      _dark={{ color: 'gray.300' }}
                    >
                      { guess.participant.email }
                    </Text>
                  </Td>
                  <Td isNumeric>
                    {guess.firstTeamPoints}
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
    </VStack>
  )
}
