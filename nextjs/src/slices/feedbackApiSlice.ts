import {
  CreateFeedbackRequest,
  Feedback,
  FeedbackQueryParams,
  FeedbackResponse,
} from '@/types/Feedback';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query<FeedbackResponse, FeedbackQueryParams>({
      query: (params) => ({
        url: '/feedback',
        params,
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return {
          sort: queryArgs.sort,
        };
      },
      merge: (currentCache, newItems, { arg }) => {
        if (!arg.cursor) {
          return newItems;
        }
        return {
          ...newItems,
          data: [...currentCache.data, ...newItems.data],
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor;
      },
      providesTags: ['Feedback'],
    }),
    createFeedback: builder.mutation<Feedback, CreateFeedbackRequest>({
      query: (feedback) => ({
        url: '/feedback',
        method: 'POST',
        body: feedback,
      }),
      invalidatesTags: ['Feedback'],
    }),
  }),
});

export const { useGetFeedbackQuery, useCreateFeedbackMutation } =
  productsApiSlice;
