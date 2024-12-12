import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const safetyApi = createApi({
  reducerPath: 'safetyApi', 
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
  tagTypes: ['Safety'], 
  endpoints: (build) => ({
    getAllsafety: build.query({
      query: () => `/api/safety`,
      providesTags: ["Safety"], // use the tag type that matches the endpoints
    }),
    getSafetybyPlaceId: build.query({
      query: (placeId) => `/api/safety-equipment/getSafetyEquipmentById/${placeId}`,
      providesTags: ["Safety"],
    }),
  }),
});

// Export hooks for each endpoint
export const {
useGetSafetybyPlaceIdQuery,
  useGetAllsafetyQuery
} = safetyApi;
