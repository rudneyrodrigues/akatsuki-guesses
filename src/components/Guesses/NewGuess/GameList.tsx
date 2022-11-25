import { isPast } from "date-fns";
import { X } from "phosphor-react";
import { Flex, Grid, Icon, Image, Spinner, Text, VStack } from "@chakra-ui/react";

import { GameSelected } from ".";
import { useGetAllGamesByPhase } from "../../../lib/useGetAllGamesByPhase";

interface GameListProps {
  phaseId: string;
  gameSelected: GameSelected;
  handleGameSelected: (props: GameSelected) => void;
}

export const GameList = ({
  phaseId,
  gameSelected,
  handleGameSelected,
}: GameListProps): JSX.Element => {
  const { data, isError, isLoading } = useGetAllGamesByPhase(phaseId);

  if (isError) {
    return (
      <VStack w="full" spacing="4">
        <Text>Erro ao carregar dados do servidor</Text>
      </VStack>
    )
  }

  if (isLoading) {
    return (
      <VStack w="full" spacing="4">
        <Spinner size="xl" color="yellow" />
      </VStack>
    )
  }

  return (
    <Grid
      w="full"
      templateColumns={{
        base: "repeat(1, fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)"
      }}
      gap={6}
    >
      { data.games.map(game => (
        <Flex
          as="button"
          p="4"
          gap="8"
          rounded="lg"
          key={game.id}
          bg={gameSelected.id === game.id ? "yellow.400" : "gray.200"}
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          disabled={isPast(new Date(game.date))}
          onClick={() => handleGameSelected({ id: game.id })}
          _disabled={{
            opacity: 0.5,
            cursor: 'not-allowed'
          }}
          _dark={{
            bg: gameSelected.id === game.id ? "yellow.200" : "gray.800"
          }}
        >
          <Text
            fontWeight="bold"
            _dark={{
              color: gameSelected.id === game.id ? "gray.800" : "gray.100"
            }}
          >
            {
              new Date(game.date).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            }
          </Text>

          <Flex
            w="full"
            gap="2"
            align="center"
            justify="space-between"
          >
            <Image
              src={game.teams[0].flagUrl}
              alt={game.teams[0].title}
              w="3.125rem"
              h="3.125rem"
              rounded="lg"
              objectFit="cover"
            />

            <Icon as={X} color="gray" />

            <Image
              src={game.teams[1].flagUrl}
              alt={game.teams[1].title}
              w="3.125rem"
              h="3.125rem"
              rounded="lg"
              objectFit="cover"
            />
          </Flex>

          <Text
            color="gray.700"
            _dark={{
              color: gameSelected.id === game.id ? "gray.800" : "gray.300"
            }}
          >
            { game.teams[0].title } x { game.teams[1].title }
          </Text>
        </Flex>
      )) }
    </Grid>
  )
}
