import Link from 'next/link';
import { Plus, X } from 'phosphor-react';
import { useSession } from 'next-auth/react';
import { Button, Divider, Flex, Grid, Heading, HStack, Icon, Image, Spinner, Text, VStack } from '@chakra-ui/react';

import { useGuessesByEmail } from '../../lib/useGuessesByEmail';


export const UserGuesses = (): JSX.Element => {
  const { data: session } = useSession();
  const { data, isError, isLoading } = useGuessesByEmail(session?.user.email);

  // sort predictions by game date
  data?.guesses.sort((a, b) => {
    return new Date(a.game.date).getTime() - new Date(b.game.date).getTime();
  });

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

  if (isError) {
    return (
      <Flex
        minH="calc(100vh - 5rem)"
        align="center"
        justify="center"
        flexDir="column"
        gap="4"
      >
        <Heading>
          Erro ao carregar dados do servidor
        </Heading>
        <Text color="gray.700" _dark={{ color: 'gray.300' }}>
          Entre em contato com o Administrado para verificar o problema
        </Text>
      </Flex>
    )
  }

  if (isLoading) {
    return (
      <Flex flex={1} minH="calc(100vh - 5rem)" align="center" justify="center">
        <Spinner size="xl" color="yellow" />
      </Flex>
    )
  }

  return (
    <VStack flex={1} w="full" spacing="8" p="8">
      <Flex
        gap="4"
        w="full"
        align="center"
        justify="space-between"
      >
        <Heading size="lg">
          Meus palpites
        </Heading>

        <Link href="/guesses/new">
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

      { data.guesses.length === 0 ? (
        <Text color="gray.700" _dark={{ color: 'gray.300' }}>
          Você ainda não registrou nenhum palpite
        </Text>
      ) : (
        <Grid
          w="full"
          gap="4"
          gridTemplateColumns={{
            base: '1fr',
            md: '1fr 1fr',
            lg: '1fr 1fr 1fr',
          }}
        >
          { data.guesses.map(guess => (
            <Flex
              key={guess.id}
              as={Link}
              href={`/game/${guess.game.id}`}
              p="2"
              py="4"
              gap="8"
              rounded="lg"
              bg="gray.200"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              _dark={{
                bg: "gray.800"
              }}
            >
              <Text
                fontWeight="bold"
                fontSize="sm"
                color="gray.700"
                _dark={{
                  color: "gray.300"
                }}
              >
                {
                  new Date(guess.game.date).toLocaleDateString('pt-BR', {
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
                <HStack>
                  <Image
                    src={guess.game.teams[0].flagUrl}
                    alt={guess.game.teams[0].title}
                    w="3.125rem"
                    h="3.125rem"
                    rounded="lg"
                    objectFit="cover"
                  />
                  <Flex
                    minW="3.125rem"
                    minH="3.125rem"
                    w="3.125rem"
                    h="3.125rem"
                    rounded="lg"
                    bg="gray.700"
                    align="center"
                    justify="center"
                  >
                    <Heading>
                      {guess.firstTeamPoints}
                    </Heading>
                  </Flex>
                </HStack>

                <Icon as={X} color="gray" />

                <HStack>
                  <Flex
                    minW="3.125rem"
                    minH="3.125rem"
                    w="3.125rem"
                    h="3.125rem"
                    rounded="lg"
                    bg="gray.700"
                    align="center"
                    justify="center"
                  >
                    <Heading>
                      {guess.secondTeamPoints}
                    </Heading>
                  </Flex>
                  <Image
                    src={guess.game.teams[1].flagUrl}
                    alt={guess.game.teams[1].title}
                    w="3.125rem"
                    h="3.125rem"
                    rounded="lg"
                    objectFit="cover"
                  />
                </HStack>
              </Flex>
            </Flex>
          )) }
        </Grid>
      ) }
    </VStack>
  )
}
