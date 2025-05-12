import { HStack, Box, CloseButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';

interface Props {
  value: number;
  onChange: (rating: number) => void;
}

const StarRating = ({ value, onChange }: Props) => {
  const [hover, setHover] = useState(0);

  const handleClick = (index: number) => {
    onChange(index);
  };

  return (
    <HStack spacing={0}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Box
          key={index}
          pr={2}
          cursor="pointer"
          onClick={() => handleClick(index)}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(0)}
        >
          <StarIcon
            boxSize={6}
            color={index <= (hover || value) ? 'blue.500' : 'gray.200'}
          />
        </Box>
      ))}
      {value > 0 && <CloseButton size="sm" onClick={() => onChange(0)} />}
    </HStack>
  );
};

export default StarRating;
