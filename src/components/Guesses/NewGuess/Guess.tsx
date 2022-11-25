import { X } from "phosphor-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Flex, HStack, Icon, Image, Input, Spinner, Text, useToast, VStack } from "@chakra-ui/react";

import { api } from "../../../services/api";
import { useGetGameById } from "../../../lib/useGetGameById";
import { useSession } from "next-auth/react";

interface GuessProps {
  gameId: string;
}

export const Guess = ({ gameId }: GuessProps): JSX.Element => {
  const toast = useToast();
  const router = useRouter();

  const { data: session } = useSession();
  const { data, isError, isLoading: isDataLoading } = useGetGameById(gameId);

  const [isLoading, setIsLoading] = useState(false);
  const [firstTeamPoint, setFirstTeamPoint] = useState(0);
  const [secondTeamPoint, setSecondTeamPoint] = useState(0);

  useEffect(() => {
    setFirstTeamPoint(0);
    setSecondTeamPoint(0);
  }, [gameId]);


  const cancelGuess = () => {
    router.push("/");
  }

  const handleSendGuess = async () => {
    try {
      setIsLoading(true);

      await api.post('/guesses/create', {
        firstTeamPoints: firstTeamPoint,
        secondTeamPoints: secondTeamPoint,
        gameId: gameId,
        email: session.user.email,
      }).then(() => {
        toast({
          title: "Palpite enviado com sucesso!",
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
        description: "Tente novamente mais tarde ou entre em contato com o Administrador.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: 'top'
      })
    } finally {
      setIsLoading(false);
    }
  }

  if (isError) {
    return (
      <VStack w="full" spacing="4">
        <Text>Erro ao carregar dados do servidor</Text>
      </VStack>
    )
  }

  if (isDataLoading) {
    return (
      <VStack w="full" spacing="4">
        <Spinner size="xl" color="yellow" />
      </VStack>
    )
  }

  return (
    <Flex flexDir="column" align="center" justify="center" gap="8">
      <VStack>
        <Text>
          {
            new Date(data.game.date).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
          }
        </Text>

        <Text>
          { data.game.teams[0].title } x { data.game.teams[1].title }
        </Text>
      </VStack>

      <HStack spacing="4">
        <Flex align="center" gap="2">
          <Image
            src={data.game.teams[0].flagUrl}
            alt={data.game.teams[0].title}
            w="3.125rem"
            h="3.125rem"
            rounded="lg"
            objectFit="cover"
          />

          <Input
            type="number"
            size="lg"
            min="0"
            max="99"
            w="4rem"
            h="3.125rem"
            textAlign="center"
            value={firstTeamPoint}
            onChange={e => setFirstTeamPoint(Number(e.target.value))}
          />
        </Flex>

        <Icon as={X} />

        <Flex align="center" gap="2">
          <Input
            type="number"
            size="lg"
            min="0"
            max="99"
            w="4rem"
            h="3.125rem"
            textAlign="center"
            value={secondTeamPoint}
            onChange={e => setSecondTeamPoint(Number(e.target.value))}
          />
          <Image
            src={data.game.teams[1].flagUrl}
            alt={data.game.teams[1].title}
            w="3.125rem"
            h="3.125rem"
            rounded="lg"
            objectFit="cover"
          />
        </Flex>
      </HStack>

      <HStack>
        <Button
          size="lg"
          colorScheme="red"
          variant="ghost"
          onClick={() => cancelGuess()}
        >
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
    </Flex>
  )
}
