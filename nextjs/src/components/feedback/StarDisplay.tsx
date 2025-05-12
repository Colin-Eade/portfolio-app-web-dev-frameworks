import { StarIcon } from '@chakra-ui/icons';
import { HStack, Box } from '@chakra-ui/react';

interface Props {
  rating: number;
}

const StarDisplay = ({ rating }: Props) => {
  return (
    <HStack spacing={0}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Box key={index} pr={2}>
          <StarIcon
            boxSize={6}
            color={index <= rating ? 'blue.500' : 'gray.200'}
          />
        </Box>
      ))}
    </HStack>
  );
};

export default StarDisplay;
