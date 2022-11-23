import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalProps } from "@chakra-ui/react";

interface NewGuessModalProps extends ModalProps {}

export const NewGuessModal = (): JSX.Element => {
  return (
    <Modal isOpen={false} onClose={() => {}} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Novo palpite
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button variant="ghost" colorScheme="red">
              Cancelar
            </Button>
            <Button colorScheme="green">
              Salvar palpite
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
