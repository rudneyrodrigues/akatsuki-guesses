import { memo } from 'react';
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Spinner,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";

import { Game } from "./Game";
import { useGetAllGames } from '../../lib/useGetAllGames';
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";

type Team = {
  title: string;
  flagUrl: string;
}

type Games = {
  id: string;
  date: string;
  teams: Team[];
  phase: {
    title: string;
  };
}

interface SidebarProps {
  games: Games[];
}

export const Sidebar = (): JSX.Element => {
  const { data, isError, isLoading } = useGetAllGames();
  const { onClose, isOpen } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    xl: false,
  });

  if (isError) {
    return (
      <Flex
        p="8"
        w="400px"
        maxH="calc(100vh - 80px)"
        minH="calc(100vh - 80px)"
        bg="gray.200"
        position="sticky"
        top="20"
        borderX="1px solid"
        borderColor="gray.300"
        overflowY="auto"
        align="center"
        justify="center"
        _dark={{
          bg: 'gray.900',
          borderColor: 'gray.800'
        }}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#202024',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#00875F',
            borderRadius: '20px',
          },
        }}
      >
        <Text>
          Ocorreu um erro ao carregar os jogos.
        </Text>
      </Flex>
    );
  }

  if (isLoading) {
    return (
      <Flex
        p="8"
        w="400px"
        maxH="calc(100vh - 80px)"
        minH="calc(100vh - 80px)"
        bg="gray.200"
        position="sticky"
        top="20"
        borderX="1px solid"
        borderColor="gray.300"
        overflowY="auto"
        align="center"
        justify="center"
        _dark={{
          bg: 'gray.900',
          borderColor: 'gray.800'
        }}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#202024',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#00875F',
            borderRadius: '20px',
          },
        }}
      >
        <Spinner size="lg" color="yellow" />
      </Flex>
    );
  }

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
        <DrawerOverlay>
          <DrawerContent
            bg="gray.200"
            p="4"
            _dark={{
              bg: 'gray.900',
            }}
          >
            <DrawerCloseButton mt="1.5rem" />

            <DrawerHeader>
              Cronograma de jogos
            </DrawerHeader>

            <DrawerBody
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#202024',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#00875F',
                  borderRadius: '20px',
                },
              }}
            >
              <VStack w="full" spacing="6">
                { data.games.map(game => (
                  <Game
                    key={game.id}
                    id={game.id}
                    date={new Date(game.date)}
                    phase={game.phase}
                    team={game.teams}
                  />
                )) }
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Box
      p="8"
      w="400px"
      h="full"
      maxH="calc(100vh - 80px)"
      bg="gray.200"
      position="sticky"
      top="20"
      borderX="1px solid"
      borderColor="gray.300"
      overflowY="auto"
      _dark={{
        bg: 'gray.900',
        borderColor: 'gray.800'
      }}
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#202024',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#00875F',
          borderRadius: '20px',
        },
      }}
    >
      <Heading
        fontSize="2xl"
      >
        Cronograma de jogos
      </Heading>

      <Divider
        my="8"
        borderColor="gray.300"
        _dark={{
          borderColor: 'gray.800'
        }}
      />

      <VStack spacing="4">
        { data.games.map(game => (
          <Game
            key={game.id}
            id={game.id}
            date={new Date(game.date)}
            phase={game.phase}
            team={game.teams}
          />
        )) }
      </VStack>
    </Box>
  )
}

// export const Sidebar = memo(SidebarComponent, (prevProps, nextProps) => {
//   return Object.is(prevProps.games, nextProps.games);
// });
