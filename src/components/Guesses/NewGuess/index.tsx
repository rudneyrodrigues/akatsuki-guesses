import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ArrowArcLeft } from 'phosphor-react';
import { Button, Divider, Flex, Heading, Icon, Text, VStack } from '@chakra-ui/react';

import { Guess } from './Guess';
import { GameList } from './GameList';
import { PhaseList } from './PhaseList';

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

export type PhaseSelected = {
  id: string;
  title: string;
}

export type GameSelected = {
  id: string;
}

interface NewGuessProps {
  games: Game[];
}

export const NewGuess = ({ games }: NewGuessProps): JSX.Element => {
  const { data: session } = useSession();

  const [gameSelected, setGameSelected] = useState<GameSelected>({} as GameSelected);
  const [phaseSelected, setPhaseSelected] = useState<PhaseSelected>({} as PhaseSelected);

  const handlePhaseSelected = (props: PhaseSelected) => {
    setPhaseSelected(props);
  }

  const handleGameSelected = (props: GameSelected) => {
    setGameSelected(props);
    // Back to top page animation
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

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
          Para poder palpitar nos jogos, é necessário realizar o login na plataforma.
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

        <Link href="/">
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

      { gameSelected.id !== undefined && (
        <>
          <Guess gameId={gameSelected.id} />

          <Divider />
        </>
      )}

      <PhaseList
        optionSelected={phaseSelected}
        setOptionSelected={handlePhaseSelected}
      />

      { phaseSelected.id !== undefined && (
        <GameList
          phaseId={phaseSelected.id}
          gameSelected={gameSelected}
          handleGameSelected={handleGameSelected}
        />
      ) }
    </VStack>
  )
}
