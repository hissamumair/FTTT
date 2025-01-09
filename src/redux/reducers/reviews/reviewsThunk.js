import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const reviewApi = createApi({
  reducerPath: 'reviewApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers, { getState }) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Reviews'], 
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (reviewData) => ({
        url: '/api/reviews', 
        method: 'POST',
        body: reviewData, 
      }),
      invalidatesTags: ['Reviews'],
    }),
    getAllreview: build.query({
      query: () => `/api/reviews`,
      providesTags: ["Reviews"], 
    }),
    getReviewsbyPlaceId: build.query({
      query: (placeId) => `/api/reviews/getReviewByplaceId/${placeId}`,
      providesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetAllreviewQuery,
  // useGetSafetybyPlaceIdQuery,
  useCreateReviewMutation,
  useGetReviewsbyPlaceIdQuery,

} = reviewApi;
