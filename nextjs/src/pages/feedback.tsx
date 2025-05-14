import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '@/Layout';
import {
  Text,
  Center,
  Select,
  useDisclosure,
  VStack,
  Spinner,
  Box,
} from '@chakra-ui/react';
import AddFeedbackCard from '../components/feedback/AddFeedbackCard';
import FeedbackModal from '../components/feedback/FeedbackModal';
import { useGetFeedbackQuery } from '@/slices/feedbackApiSlice';
import FeedbackCard from '@/components/feedback/FeedbackCard';
import FeedbackCardSkeleton from '@/components/feedback/FeedbackCardSkeleton';
import { FeedbackQueryParams, SortOptions } from '@/types/Feedback';

const Feedback = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sort, setSort] = useState<SortOptions>('newest');
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const { data, isLoading, isFetching, isError } = useGetFeedbackQuery({
    sort,
    cursor,
  } as FeedbackQueryParams);

  const feedbackData = data?.data ?? [];

  const handleSortChange = (newSort: SortOptions) => {
    setSort(newSort);
    setCursor(undefined);
  };

  const handleFeedbackSubmitted = () => {
    setCursor(undefined);
  };

  const loadMore = () => {
    if (data?.nextCursor && !isFetching) {
      setCursor(data.nextCursor);
    }
  };

  return (
    <Layout title="Feedback" backNav={{ title: 'Home', link: '/' }}>
      <AddFeedbackCard onClick={onOpen} />
      <FeedbackModal
        isOpen={isOpen}
        onClose={onClose}
        onFeedbackSubmitted={handleFeedbackSubmitted}
      />

      <Select
        w="200px"
        mt={4}
        mb={4}
        value={sort}
        onChange={(e) => handleSortChange(e.target.value as SortOptions)}
      >
        <option value="newest">Most Recent</option>
        <option value="oldest">Oldest</option>
        <option value="highest-rated">Highest Rated</option>
        <option value="lowest-rated">Lowest Rated</option>
      </Select>

      {(isLoading || isFetching) && !cursor ? (
        <VStack spacing={4} mt={4}>
          {[...Array(4)].map((_, index) => (
            <FeedbackCardSkeleton key={`initial-loading-${index}`} />
          ))}
        </VStack>
      ) : isError ? (
        <Center mt={4}>
          <Text color="red.500">
            An error occurred while loading feedback. Please try again
          </Text>
        </Center>
      ) : feedbackData.length === 0 ? (
        <Center mt={4}>
          <Text color="gray.500">No feedback posted yet. Be the first!</Text>
        </Center>
      ) : (
        <Box>
          <InfiniteScroll
            dataLength={feedbackData.length}
            next={loadMore}
            hasMore={data?.hasMore ?? false}
            loader={
              <Center py={4} w="100%">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  color="gray.500"
                  size="lg"
                />
              </Center>
            }
            scrollThreshold="95%"
            style={{ overflow: 'visible' }}
          >
            <VStack spacing={4} mt={4}>
              {feedbackData.map((feedback) => (
                <FeedbackCard key={feedback.uuid} feedback={feedback} />
              ))}
            </VStack>
          </InfiniteScroll>
        </Box>
      )}
    </Layout>
  );
};

export default Feedback;
