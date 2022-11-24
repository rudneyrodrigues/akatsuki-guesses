import { Plus } from 'phosphor-react';
import { useSession } from 'next-auth/react';
import { Button, Divider, Flex, Heading, Highlight, Icon, Text, VStack } from '@chakra-ui/react';

import Link from 'next/link';

export const UserGuesses = (): JSX.Element => {
  const { data: session } = useSession();

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
          Meus palpites
        </Heading>

        <Link href="/guesses/new" passHref>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={
              <Icon as={Plus} />
            }
          >
            Novo palpite
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

      <VStack spacing="4">
        <Text
          color="gray.900"
          fontWeight="bold"
          fontSize="xl"
          _dark={{
            color: 'gray.100'
          }}
        >
          Você ainda não possui nenhum palpite cadastrado
        </Text>

        <Text
          color="gray.700"
          fontSize="sm"
          _dark={{
            color: 'gray.300'
          }}
        >
          <Highlight
            query="+ Novo palpite"
            styles={{
              bg: 'gray.200',
              color: 'gray.900',
              py: '1',
              px: '2',
              rounded:'sm',
              fontSize: 'sm',
              fontWeight: 'bold',
              _dark: {
                bg: 'gray.700',
                color: 'gray.100'
              }
            }}
          >
            Clique no botão + Novo palpite para adicionar um palpite em algum jogo.
          </Highlight>
        </Text>
      </VStack>
    </VStack>
  )
}
