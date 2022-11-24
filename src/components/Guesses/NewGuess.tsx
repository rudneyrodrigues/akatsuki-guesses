import { useSession } from 'next-auth/react';
import { Button, Collapse, Divider, Flex, Grid, GridItem, Heading, HStack, Icon, Stack, Text, VStack } from '@chakra-ui/react';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowArcLeft, House, X } from 'phosphor-react';

type Team = {
  title: string;
  flagUrl: string;
}

type Game = {
  id: string;
  date: string;
  teams: Team[];
  phase: {
    title: string;
  };
}

type PhaseGame = {
  phase: "grupos" | "oitavas" | "quartas" | "semifinal" | "final";
}

interface NewGuessProps {
  games: Game[];
}

export const NewGuess = ({ games }: NewGuessProps): JSX.Element => {
  const { data: session } = useSession();

  const [optionSelected, setOptionSelected] = useState<PhaseGame>({} as PhaseGame);

  const groupStage = games.filter(game => game.phase.title === 'Fase de Grupos');

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

  return (
    <VStack flex={1} spacing="8" p="8">
      <Flex
        gap="4"
        w="full"
        align="center"
        justify="space-between"
      >
        <Heading size="lg">
          Novo palpite
        </Heading>

        <Link href="/" passHref>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={
              <Icon as={ArrowArcLeft} />
            }
          >
            Voltar
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

      <VStack w="full" spacing="4">
        <Text fontSize="sm" color="gray.800" _dark={{ color: 'gray.300' }}>
          Selecione a fase de jogos
        </Text>

        <Stack w="full" direction={{
          base: 'column',
          md: 'row'
        }} spacing="4" justify="center">
          <Button
            colorScheme={
              optionSelected.phase === 'grupos' ? "green" : "gray"
            }
            onClick={() => setOptionSelected({ phase: "grupos" })}
          >
            Fase de grupos
          </Button>
          <Button
            colorScheme={
              optionSelected.phase === 'oitavas' ? "green" : "gray"
            }
            onClick={() => setOptionSelected({ phase: "oitavas" })}
          >
            Oitavas de final
          </Button>
          <Button
            colorScheme={
              optionSelected.phase === 'quartas' ? "green" : "gray"
            }
            onClick={() => setOptionSelected({ phase: "quartas" })}
          >
            Quartas de final
          </Button>
          <Button
            colorScheme={
              optionSelected.phase === 'semifinal' ? "green" : "gray"
            }
            onClick={() => setOptionSelected({ phase: "semifinal" })}
          >
            Semifinal
          </Button>
          <Button
            colorScheme={
              optionSelected.phase === 'final' ? "green" : "gray"
            }
            onClick={() => setOptionSelected({ phase: "final" })}
          >
            Final
          </Button>
        </Stack>
      </VStack>

      <VStack w="full" spacing="4">
        { Object.keys(optionSelected).length !== 0 && (
          <Text fontSize="sm" color="gray.800" _dark={{ color: 'gray.300' }}>
            Selecione uma partida para palpitar
          </Text>
        ) }

        <Grid
          w="full"
          templateColumns={{
            base: "repeat(1, fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)"
          }}
          gap={6}
        >
          { optionSelected.phase === 'grupos' && (
            <>
              { groupStage.map(game => (
                <Button
                  h='10'
                  w='full'
                  as={GridItem}
                  key={game.id}
                  rounded="md"
                  cursor="pointer"
                >
                  <HStack>
                    <Text>
                      { game.teams[0].title }
                    </Text>
                    <Icon as={X} />
                    <Text>
                      { game.teams[1].title }
                    </Text>
                  </HStack>
                </Button>
              )) }
            </>
          ) }
        </Grid>
      </VStack>
    </VStack>
  )
}
