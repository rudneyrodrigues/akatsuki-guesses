import { Button, Spinner, Stack, Text, VStack } from "@chakra-ui/react";

import { useGetAllPhases } from "../../../lib/useGetAllPhases";
import { PhaseSelected } from './';

interface PhaseListProps {
  optionSelected: PhaseSelected;
  setOptionSelected: (props: PhaseSelected) => void;
}

export const PhaseList = ({
  optionSelected,
  setOptionSelected,
}: PhaseListProps): JSX.Element => {
  const { data, isError, isLoading } = useGetAllPhases();

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
    <VStack w="full" spacing="4">
      <Text fontSize="sm" color="gray.800" _dark={{ color: 'gray.300' }}>
        Selecione a fase de jogos
      </Text>

      <Stack w="full" direction={{
        base: 'column',
        md: 'row'
      }} spacing="4" justify="center">
        { data.phases.map(phase => (
          <Button
            key={phase.id}
            colorScheme={optionSelected.title === phase.title ? 'yellow' : 'gray'}
            onClick={() => setOptionSelected(phase)}
          >
            {phase.title}
          </Button>
        )) }
      </Stack>
    </VStack>
  )
}
