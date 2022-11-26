import Link from 'next/link';
import { Plus, X } from 'phosphor-react';
import { Box, Button, Divider, Flex, Grid, Heading, HStack, Icon, Image, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';

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
      <Grid
        gap="4"
        w={{ md: 'full' }}
        alignSelf="center"
        alignItems="center"
        justifyContent="space-between"
        gridTemplateColumns={{
          base: '1fr',
          md: '1fr 1fr 1fr',
        }}
      >
        <Heading size="md" textAlign={{
          base: 'center',
          md: 'left',
        }}>
          {game.teams[0].title} x {game.teams[1].title}
        </Heading>

        <Flex
          gap="2"
          align="center"
        >
          <HStack>
            <Image
              src={game.teams[0].flagUrl}
              alt={game.teams[0].title}
              w="3.125rem"
              h="3.125rem"
              objectFit="cover"
              rounded="lg"
            />

            <Flex
              align="center"
              justify="center"
              w="3.125rem"
              minW="3.125rem"
              h="3.125rem"
              minH="3.125rem"
              bg="gray.200"
              rounded="lg"
              _dark={{
                bg: 'gray.800'
              }}
            >
              <Heading size="lg">
                {game.firstTeamPoints}
              </Heading>
            </Flex>
          </HStack>

          <Icon as={X} />

          <HStack>
            <Flex
              align="center"
              justify="center"
              w="3.125rem"
              minW="3.125rem"
              h="3.125rem"
              minH="3.125rem"
              bg="gray.200"
              rounded="lg"
              _dark={{
                bg: 'gray.800'
              }}
            >
              <Heading size="lg">
                {game.secondTeamPoints}
              </Heading>
            </Flex>

            <Image
              src={game.teams[1].flagUrl}
              alt={game.teams[1].title}
              w="3.125rem"
              h="3.125rem"
              objectFit="cover"
              rounded="lg"
            />
          </HStack>
        </Flex>

        <Text
          fontSize="sm"
          textAlign={{
            base: 'center',
            md: "right"
          }}
          color="gray.700"
          _dark={{ color: 'gray.300' }}
        >
          {new Date(game.date).toLocaleString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </Grid>

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
