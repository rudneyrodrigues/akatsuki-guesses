import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Moon, PencilSimpleLine, Plus, SignOut, Star, Sun } from "phosphor-react";
import { Avatar, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useColorMode } from "@chakra-ui/react";

export const UserMenu = (): JSX.Element => {
  const { data: session } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton
        rounded="full"
        border="2px solid"
        borderColor={colorMode === 'dark'? 'gray.700' : 'gray.200'}
      >
        <Avatar
          size="md"
          name={String(session?.user?.name)}
          src={String(session?.user?.image)}
        />
      </MenuButton>

      <MenuList>
        <Link href="/guesses/new" passHref>
          <MenuItem icon={<Plus size={20} />}>
            Novo palpite
          </MenuItem>
        </Link>
        <Link href="/" passHref>
          <MenuItem icon={<PencilSimpleLine size={20} />}>
            Meus palpites
          </MenuItem>
        </Link>
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

        <Link href="/ranking">
          <MenuItem icon={<Star size={20} />}>
            Ranking de pontos
          </MenuItem>
        </Link>

        <MenuDivider />

        <MenuItem
          onClick={() => signOut()}
          icon={<SignOut size={20} />}
          _hover={{
            bg: 'red.300'
          }}
          _dark={{
            _hover: {
              bg: 'red.500'
            }
          }}
        >
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
