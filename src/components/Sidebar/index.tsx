import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";

import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Game } from "./Game";

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

export const Sidebar = ({ games }: SidebarProps): JSX.Element => {
  const { onClose, isOpen } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    xl: false,
  });

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
                { games.map(game => (
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
        { games.map(game => (
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
