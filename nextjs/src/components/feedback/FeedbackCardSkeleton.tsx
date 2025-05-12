import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';

const FeedbackCardSkeleton = () => {
  return (
    <Card w="100%">
      <CardBody pb={4}>
        <Flex justify="space-between" align="center">
          <Box>
            <Skeleton height="24px" width="120px" mb={2} />
            <Skeleton height="16px" width="80px" />
          </Box>
          <Skeleton height="24px" width="100px" />
        </Flex>
      </CardBody>
      <Divider />
      <CardBody pt={2}>
        <SkeletonText mt={1} noOfLines={4} spacing={4} skeletonHeight="4" />
      </CardBody>
    </Card>
  );
};

export default FeedbackCardSkeleton;
