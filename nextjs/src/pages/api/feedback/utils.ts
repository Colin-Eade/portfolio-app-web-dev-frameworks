import { SortOptions } from '@/types/Feedback';
import { DynamoDB } from 'aws-sdk';

export const getSortParams = (
  sort?: SortOptions,
): Partial<DynamoDB.DocumentClient.QueryInput> => {
  const baseParams = {
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': 'feedback',
    },
  };

  switch (sort) {
    case 'highest-rated':
      return {
        ...baseParams,
        IndexName: 'RatingIndex',
        ScanIndexForward: false,
      };

    case 'lowest-rated':
      return {
        ...baseParams,
        IndexName: 'RatingIndex',
        ScanIndexForward: true,
      };

    case 'oldest':
      return {
        ...baseParams,
        ScanIndexForward: true,
      };

    case 'newest':
    default:
      return {
        ...baseParams,
        ScanIndexForward: false,
      };
  }
};

export const encodeCursor = (key: DynamoDB.DocumentClient.Key): string =>
  Buffer.from(JSON.stringify(key)).toString('base64');

export const decodeCursor = (cursor: string): DynamoDB.DocumentClient.Key =>
  JSON.parse(Buffer.from(cursor, 'base64').toString('ascii'));
