import Image from 'next/image';
import { GoogleLogo, List } from 'phosphor-react';
import { useSession, signIn } from 'next-auth/react';
import { Box, Flex, Button, useColorMode, HStack, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react';

import { UserMenu } from '../Menu/UserMenu';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

export const Header = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const { data: session } = useSession();
  const { onOpen } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    xl: false,
  });

  return (
    <Box
      h="20"
      px="4"
      top="0"
      position="sticky"
      bg="gray.200"
      borderBottom="1px solid"
      borderBottomColor="gray.300"
      zIndex="sticky"
      _dark={{
        bg: 'gray.900',
        borderBottomColor: 'gray.800'
      }}
    >
      <Flex
        h="20"
        w="full"
        gap="2"
        mx="auto"
        align="center"
        maxW="container.lg"
        justify="space-between"
      >
        <Image
          src={colorMode === 'dark'
            ? "/images/logo-dark.svg"
            : "/images/logo-light.svg"
          }
          alt="Copa do Mundo 2022"
          width={201}
          height={31}
        />

        <HStack spacing="2">
          { session ? (
            <UserMenu />
          ) : (
            <Button
              size="lg"
              rounded="full"
              leftIcon={<GoogleLogo size={24} />}
              onClick={() => signIn('google')}
            >
              Entrar com o google
            </Button>
          ) }

          { isDrawerSidebar && (
            <IconButton
              aria-label="Lista de Jogos"
              variant="ghost"
              icon={
                <Icon as={List} w="6" h="6" weight="bold" />
              }
              onClick={onOpen}
            />
          ) }
        </HStack>
      </Flex>
    </Box>
  )
}
