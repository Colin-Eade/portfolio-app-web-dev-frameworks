import { useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
  FormControl,
  Input,
  VStack,
  Button,
  FormLabel,
  Flex,
  Text,
  useDisclosure,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useCreateFeedbackMutation } from '@/slices/feedbackApiSlice';
import { CreateFeedbackRequest } from '@/types/Feedback';
import StarRating from './StarRating';
import RichTextEditor from './RichTextEditor';
import ConfirmationDialog from './ConfirmationDialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal = ({ isOpen, onClose }: Props) => {
  const [createFeedback] = useCreateFeedbackMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateFeedbackRequest>({
    defaultValues: {
      author: '',
      rating: 0,
      post: '',
    },
  });

  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const [errorMessage, setErrorMessage] = useState('');

  const cancelRef = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<CreateFeedbackRequest> = async (data) => {
    try {
      await createFeedback(data).unwrap();
      reset();
      setErrorMessage('');
      onClose();
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.message ||
        'An unexpected error occurred. Please try again later.';
      setErrorMessage(message);
    }
  };

  const handleModalClose = () => {
    if (isDirty) {
      onConfirmOpen();
    } else {
      reset();
      setErrorMessage('');
      onClose();
    }
  };

  const handleDiscard = () => {
    reset();
    onConfirmClose();
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        closeOnOverlayClick={!isSubmitting}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Feedback</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              {/* Name Field */}
              <FormControl isRequired isInvalid={!!errors.author}>
                <Flex align="center">
                  <FormLabel mr={1} mb={1} mt={1}>
                    Name
                  </FormLabel>
                  {errors.author && (
                    <Text color="red.500" fontSize="sm">
                      {errors.author.message}
                    </Text>
                  )}
                </Flex>
                <Controller
                  name="author"
                  control={control}
                  rules={{
                    required: 'Name is required',
                  }}
                  render={({ field }) => <Input type="text" {...field} />}
                />
              </FormControl>

              {/* Rating Field */}
              <FormControl isRequired isInvalid={!!errors.rating}>
                <Flex align="center">
                  <FormLabel mr={1} mb={1} mt={1}>
                    Rating
                  </FormLabel>
                  {errors.rating && (
                    <Text pl={0} color="red.500" fontSize="sm">
                      {errors.rating.message}
                    </Text>
                  )}
                </Flex>
                <Controller
                  name="rating"
                  control={control}
                  rules={{
                    required: 'Rating is required',
                    min: { value: 1, message: 'Rating is required' },
                    max: { value: 5, message: 'Rating cannot exceed 5' },
                  }}
                  render={({ field }) => (
                    <StarRating value={field.value} onChange={field.onChange} />
                  )}
                />
              </FormControl>

              {/* Feedback Field */}
              <FormControl isRequired isInvalid={!!errors.post}>
                <Flex align="center">
                  <FormLabel mr={1} mb={1} mt={1}>
                    Feedback
                  </FormLabel>
                  {errors.post && (
                    <Text pl={0} color="red.500" fontSize="sm">
                      {errors.post.message}
                    </Text>
                  )}
                </Flex>
                <Controller
                  name="post"
                  control={control}
                  rules={{
                    required: 'Feedback is required',
                    validate: (value) =>
                      // Empty HTML tag check
                      !/^(?:<[^>]+>\s*<\/[^>]+>\s*)+$/.test(value.trim()) ||
                      'Feedback is required',
                  }}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </FormControl>

              {/* Submit Button */}
              <Flex w="full" justify="flex-end" align="center" gap={2}>
                {errorMessage && (
                  <Alert status="error" pt={1} pb={1}>
                    <AlertIcon />
                    {errorMessage}
                  </Alert>
                )}
                <Button
                  onClick={handleSubmit(onSubmit)}
                  isLoading={isSubmitting}
                  loadingText="Submitting..."
                >
                  Submit
                </Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        onDiscard={handleDiscard}
        cancelRef={cancelRef}
      />
    </>
  );
};

export default FeedbackModal;
