import styles from '@/styles/richText.module.css';
import { Box, Card, CardBody, Divider, Flex, Text } from '@chakra-ui/react';
import { Feedback } from '@/types/Feedback';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import StarDisplay from './StarDisplay';

dayjs.extend(relativeTime);

interface Props {
  feedback: Feedback;
}

const FeedbackCard = ({ feedback }: Props) => {
  return (
    <Card w="100%">
      <CardBody pb={4}>
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontWeight="bold">{feedback.author}</Text>
            <Text fontSize="sm" color="gray.500">
              {dayjs(feedback.createdAt).fromNow()}
            </Text>
          </Box>
          <StarDisplay rating={feedback.rating} />
        </Flex>
      </CardBody>
      <Divider />
      <CardBody pt={2}>
        <Box
          className={styles.richText}
          dangerouslySetInnerHTML={{ __html: feedback.post }}
        />
      </CardBody>
    </Card>
  );
};

export default FeedbackCard;
