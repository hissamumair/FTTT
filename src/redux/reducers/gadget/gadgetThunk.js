import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const gadgetApi = createApi({
  reducerPath: 'gadgetApi', 
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
  tagTypes: ['Gadget'], 
  endpoints: (build) => ({
    getAllGadgets: build.query({
      query: () => `/api/gadget`,
      providesTags: ["Gadget"], // use the tag type that matches the endpoints
    }),
    getGadgetByPlaceId: build.query({
      query: (placeId) => `/api/gadgets/getGadgetByPlaceId/${placeId}`,
      providesTags: ["Gadget"],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useGetAllGadgetsQuery,
  useGetGadgetByPlaceIdQuery
} = gadgetApi;
