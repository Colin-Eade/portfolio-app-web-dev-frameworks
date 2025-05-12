import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import {
  Feedback,
  CreateFeedbackRequest,
  FeedbackResponse,
  FeedbackQueryParams,
} from '@/types/Feedback';
import { decodeCursor, encodeCursor, getSortParams } from './utils';

export class FeedbackService {
  private dynamodb: DynamoDB.DocumentClient;
  private readonly tableName = 'Feedback';
  private readonly defaultLimit = 5;

  constructor() {
    this.dynamodb = new DynamoDB.DocumentClient();
  }

  async get(params: FeedbackQueryParams): Promise<FeedbackResponse> {
    const { sort, cursor } = params;
    const startKey = cursor ? decodeCursor(cursor) : undefined;

    const result = await this.dynamodb
      .query({
        TableName: this.tableName,
        Limit: this.defaultLimit,
        ...getSortParams(sort),
        ...(startKey && { ExclusiveStartKey: startKey }),
      })
      .promise();

    const response: FeedbackResponse = {
      data: result.Items as Feedback[],
      hasMore: !!result.LastEvaluatedKey,
    };

    if (result.LastEvaluatedKey) {
      response.nextCursor = encodeCursor(result.LastEvaluatedKey);
    }

    return response;
  }

  async create(data: CreateFeedbackRequest): Promise<Feedback> {
    const feedback: Feedback = {
      id: 'feedback',
      createdAt: new Date().toISOString(),
      uuid: uuid(),
      ...data,
    };

    await this.dynamodb
      .put({
        TableName: 'Feedback',
        Item: feedback,
      })
      .promise();

    return feedback;
  }
}
