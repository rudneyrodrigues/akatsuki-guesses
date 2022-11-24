import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ArrowArcLeft, X } from 'phosphor-react';
import { Button, Divider, Flex, Grid, GridItem, Heading, HStack, Icon, Image, Input, Stack, Text, useToast, VStack } from '@chakra-ui/react';

import { api } from '../../services/api';
import Link from 'next/link';
import { AxiosError } from 'axios';

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
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [firstTeamPoint, setFirstTeamPoint] = useState(0);
  const [secondTeamPoint, setSecondTeamPoint] = useState(0);

  const [gameSelected, setGameSelected] = useState<Game>({} as Game);
  const [optionSelected, setOptionSelected] = useState<PhaseGame>({} as PhaseGame);

  const groupStage = games.filter(game => game.phase.title === 'Fase de Grupos');

  const selectGameById = (id: string) => {
    const selected = games.find(game => game.id === id);

    if (selected === undefined) {
      setGameSelected({} as Game);
    }

    setGameSelected(selected as Game);
  }

  const cancelGuess = () => {
    setGameSelected({} as Game);
  }

  const handleSendGuess = async () => {
    if (gameSelected.id === undefined) {
      toast({
        title: "Erro",
        description: "Você precisa selecionar um jogo",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    try {
      setIsLoading(true);

      await api.post('/guesses/create', {
        firstTeamPoints: firstTeamPoint,
        secondTeamPoints: secondTeamPoint,
        gameId: gameSelected.id,
        email: session.user.email,
      }).then(() => {
        toast({
          title: "Palpite enviado com sucesso!",
          description: `${gameSelected.teams[0].title} ${firstTeamPoint} x ${secondTeamPoint} ${gameSelected.teams[1].title}`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: 'top'
        })

        router.push('/');
      }).catch((err) => {
        toast({
          title: "Erro ao enviar palpite.",
          description: err.response.data.error,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: 'top'
        })
      }).finally(() => {
        setIsLoading(false);
      })
    } catch (error) {
      console.log(error);

      toast({
        title: "Erro ao enviar palpite.",
        description: "Tente novamente mais tarde.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: 'top'
      })
    } finally {
      setIsLoading(false);
    }
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
              optionSelected.phase === 'grupos' ? "yellow" : "gray"
            }
            onClick={() => setOptionSelected({ phase: "grupos" })}
          >
            Fase de grupos
          </Button>
          <Button
            colorScheme={
              optionSelected.phase === 'oitavas' ? "yellow" : "gray"
            }
            onClick={() => setOptionSelected({ phase: "oitavas" })}
          >
            Oitavas de final
          </Button>
          <Button
            colorScheme={
              optionSelected.phase === 'quartas' ? "yellow" : "gray"
            }
            onClick={() => setOptionSelected({ phase: "quartas" })}
          >
            Quartas de final
          </Button>
          <Button
            colorScheme={
              optionSelected.phase === 'semifinal' ? "yellow" : "gray"
            }
            onClick={() => setOptionSelected({ phase: "semifinal" })}
          >
            Semifinal
          </Button>
          <Button
            colorScheme={
              optionSelected.phase === 'final' ? "yellow" : "gray"
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
                  colorScheme={gameSelected.id === game.id ? "yellow" : "gray"}
                  onClick={() => selectGameById(game.id)}
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

      <VStack w="full" spacing="8">
        { Object.keys(gameSelected).length !== 0 && (
          <Text fontSize="sm" color="gray.800" _dark={{ color: 'gray.300' }}>
            Informe o palpite da partida abaixo
          </Text>
        ) }

        { Object.keys(gameSelected).length !== 0 && (
          <Flex
            align="center"
            justify="center"
            gap="4"
          >
            <HStack>
              <Image
                aria-label="Team 1"
                w="3.125rem"
                h="3.125rem"
                objectFit="cover"
                borderRadius="md"
                src={gameSelected?.teams[0].flagUrl}
              />
              <Input
                w="3.125rem"
                h="3.125rem"
                type="number"
                min="0"
                max="99"
                value={firstTeamPoint}
                onChange={e => setFirstTeamPoint(Number(e.target.value))}
              />
            </HStack>
            <Icon as={X} />
            <HStack>
              <Input
                w="3.125rem"
                h="3.125rem"
                type="number"
                min="0"
                max="99"
                value={secondTeamPoint}
                onChange={e => setSecondTeamPoint(Number(e.target.value))}
              />
              <Image
                aria-label="Team 2"
                w="3.125rem"
                h="3.125rem"
                objectFit="cover"
                borderRadius="md"
                src={gameSelected?.teams[1].flagUrl}
              />
            </HStack>
          </Flex>
        ) }

        { Object.keys(gameSelected).length !== 0 && (
          <HStack spacing="4">
            <Button size="lg" variant="ghost" colorScheme="red" onClick={() => cancelGuess()}>
              Cancelar
            </Button>
            <Button
              size="lg"
              colorScheme="green"
              isLoading={isLoading}
              onClick={() => handleSendGuess()}
            >
              Enviar palpite
            </Button>
          </HStack>
        ) }
      </VStack>
    </VStack>
  )
}
