import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseURL} from "../../baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
// register new user

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers, {getState}) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "CurrentLoginUser"],
  reducerPath: "userApi",
  endpoints: build => ({
    registerUser: build.mutation({
      query: user => ({
        url: `/api/user/register`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: build.mutation({
      query: user => ({
        url: `/api/user/login`,
        method: "POST",
        body: {
          email: user.email,
          password: user.password,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {useLoginUserMutation, useRegisterUserMutation} = userApi;
