import Link from 'next/link';
import { memo } from 'react';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { isPast, format } from 'date-fns';
import { SoccerBall, X } from 'phosphor-react';
import { Flex, Text, Link as ChakraLink, Tag, Icon, Image, useBreakpointValue } from "@chakra-ui/react";

type Team = {
  title: string;
  flagUrl: string;
}

type GameProps = {
  id: string;
  date: Date;
  team: Team[];
  phase: {
    title: string;
  };
}

const GameComponent = (props: GameProps): JSX.Element => {
  const { asPath } = useRouter();

  const isGuessAvailable = isPast(props.date);
  const availableDateFormatted = format(props.date, "EEEE' • 'dd' de 'MMMM' • 'k'h'mm", { locale: ptBR });

  const isActiveLesson = asPath.includes(props.id);

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    sm: false,
  });

  return (
    <Flex flexDir="column" gap=".5rem" w="full">
      <Text
        color="gray.700"
        _dark={{
          color: 'gray.300',
        }}
      >
        {availableDateFormatted}
      </Text>

      <ChakraLink
        as={Link}
        href={`/game/${props.id}`}
        p="1rem"
        borderRadius="md"
        border="1px solid"
        transitionDuration=".2s"
        bgColor={isActiveLesson ? "green.500" : ""}
        opacity={!isGuessAvailable ? "" : ".5"}
        pointerEvents={isGuessAvailable ? "none" : "auto"}
        borderColor={isActiveLesson ? "green.500" : "gray.500"}
        _hover={{
          textDecoration: "none",
          cursor: isGuessAvailable && "not-allowed",
          borderColor: "green.500",
        }}
        passHref
      >
        <Flex align="center" justify="space-between" gap="2">
          <Text
            gap="2"
            fontSize="sm"
            display="flex"
            alignItems="center"
            fontWeight="semibold"
            _dark={{
              color: 'yellow.500'
            }}
          >
            <SoccerBall size={24} />
            { props.phase.title }
          </Text>

          <Tag size="sm" colorScheme={!isGuessAvailable ? "green" : "red"}>
            { !isGuessAvailable ? "Aberto" : "Encerrado" }
          </Tag>
        </Flex>

        <Flex align="center" justify="space-between" mt="4" gap="2">
          <Flex align="center" gap="2">
            <Image
              src={props.team[0].flagUrl}
              alt={props.team[0].title}
              width={isDrawerSidebar ? "2rem" : "3.125rem"}
              height={isDrawerSidebar ? "2rem" : "3.125rem"}
              objectFit="cover"
              borderRadius="md"
            />
            <Text>
              {props.team[0].title}
            </Text>
          </Flex>

          <Icon
            as={X}
            color="gray.700"
            _dark={{
              color: 'gray.300'
            }}
          />

          <Flex align="center" gap="2">
            <Text
              display="inline-block"
              w={isDrawerSidebar ? "70px" : "auto"}
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {props.team[1].title}
            </Text>

            <Image
              src={props.team[1].flagUrl}
              alt={props.team[1].title}
              width={isDrawerSidebar ? "2rem" : "3.125rem"}
              height={isDrawerSidebar ? "2rem" : "3.125rem"}
              objectFit="cover"
              borderRadius="md"
            />
          </Flex>
        </Flex>
      </ChakraLink>
    </Flex>
  )
}

export const Game = memo(GameComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.id, nextProps.id);
})
