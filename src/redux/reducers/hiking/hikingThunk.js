import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
// register new user

export const hikingApi = createApi({
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
  tagTypes: ['Hiking'],
  reducerPath: 'hikingApi',
  endpoints: build => ({
    getAllHikings: build.query({
      query: () => `/api/hiking`,
      providesTags: ["Hiking"],
    }),
    getHikingByPlaceId: build.query({
      query: (placeId) => `/api/hiking/getHikeByPlaceId/${placeId}`,
      providesTags: ["Hiking"],
    }),
  }),
});

export const {
  useGetAllHikingsQuery,
  useGetHikingByPlaceIdQuery
} = hikingApi;