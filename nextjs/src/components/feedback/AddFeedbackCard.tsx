import { Card, CardBody, Circle, HStack, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface Props {
  onClick: () => void;
}

const AddFeedbackCard = ({ onClick }: Props) => {
  return (
    <Card
      as="button"
      width="100%"
      _hover={{
        boxShadow: 'lg',
      }}
      onClick={onClick}
    >
      <CardBody width="100%">
        <HStack justifyContent="space-between" margin="auto">
          <Text fontWeight="bold">Add feedback</Text>
          <Circle bgColor="gray.200" size={8}>
            <AddIcon color="gray.800" />
          </Circle>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default AddFeedbackCard;
