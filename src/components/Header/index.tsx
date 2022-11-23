import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { GoogleLogo, Sun, Moon, SignOut, PencilSimpleLine } from 'phosphor-react';
import { Box, Flex, Button, Menu, MenuButton, Avatar, MenuList, MenuItem, useColorMode, MenuDivider } from '@chakra-ui/react';

export const Header = (): JSX.Element => {
  const { data: session } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      h="20"
      px="4"
      bg="gray.100"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      _dark={{
        bg: 'gray.950',
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
          src={colorMode === 'dark' ? "/images/logo-dark.svg" : "/images/logo-light.svg"}
          alt="Copa do Mundo 2022"
          width={201}
          height={31}
        />

        { session ? (
          <Menu>
            <MenuButton
              rounded="full"
              border="2px solid"
              borderColor={colorMode === 'dark'? 'gray.700' : 'gray.200'}
            >
              <Avatar
                size="md"
                name={String(session.user?.name)}
                src={String(session.user?.image)}
              />
            </MenuButton>

            <MenuList>
              <MenuItem icon={<PencilSimpleLine size={20} />}>
                Meus palpites
              </MenuItem>
              { colorMode === 'dark' ? (
                <MenuItem icon={<Sun size={20} />} onClick={toggleColorMode}>
                  Tema claro
                </MenuItem>
              ) : (
                <MenuItem icon={<Moon size={20} />} onClick={toggleColorMode}>
                  Tema escuro
                </MenuItem>
              ) }

              <MenuDivider />

              <MenuItem
                onClick={() => signOut()}
                icon={<SignOut size={20} />}
                _hover={{
                  bg: 'red.500'
                }}
              >
                Sair
              </MenuItem>
            </MenuList>
          </Menu>
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
      </Flex>
    </Box>
  )
}
