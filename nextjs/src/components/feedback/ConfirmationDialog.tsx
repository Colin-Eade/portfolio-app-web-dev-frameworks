import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { RefObject } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDiscard: () => void;
  cancelRef: RefObject<HTMLButtonElement>;
}

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onDiscard,
  cancelRef,
}: Props) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Discard Changes?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to discard your changes? They will not be
            saved.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDiscard} ml={3}>
              Discard
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
