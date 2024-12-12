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
    ForgotPassword: build.mutation({
      query: user => ({
        url: `/api/user/forget`,
        method: "POST",
        body: {
          email: user.email,
        },
      }),
      invalidatesTags: ["User"],
    }),
    verifyOTP: build.mutation({
      query: user => ({
        url: `/api/user/verify-otp`,
        method: "POST",
        body: {
          email: user.email,
          otp: user.otp,
        },
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: build.mutation({
      query: user => ({
        url: `/api/user/resetPass/${user.resetToken}`,
        method: "POST",
        body: {
          password: user.password,
        },
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
    getCurrentUser: build.mutation({
      query: user => ({
        url: `/api/user/getCurrentUser/${user.userId}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
  useGetCurrentUserMutation
} = userApi;
