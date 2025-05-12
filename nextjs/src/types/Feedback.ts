export interface Feedback {
  id: string;
  createdAt: string;
  uuid: string;
  author: string;
  rating: number;
  post: string;
}

export interface CreateFeedbackRequest {
  author: string;
  rating: number;
  post: string;
}

export interface FeedbackResponse {
  data: Feedback[];
  nextCursor?: string;
  hasMore: boolean;
}

export interface FeedbackQueryParams {
  sort?: SortOptions;
  cursor?: string;
}

export type SortOptions =
  | 'newest'
  | 'oldest'
  | 'highest-rated'
  | 'lowest-rated';
