import { baseApi } from '../../baseApi';
import { API_ENDPOINTS, HTTP_METHODS } from '@/shared/constants';
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  VerifyOtpRequest,
  ResendOtpRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './authApi.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: credentials => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: HTTP_METHODS.POST,
        body: credentials,
      }),
    }),
    signup: builder.mutation<{ message: string; destination: string }, SignupRequest>({
      query: data => ({
        url: API_ENDPOINTS.AUTH.SIGNUP,
        method: HTTP_METHODS.POST,
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<AuthResponse, VerifyOtpRequest>({
      query: payload => ({
        url: API_ENDPOINTS.AUTH.VERIFY_OTP,
        method: HTTP_METHODS.POST,
        body: payload,
      }),
    }),
    resendOtp: builder.mutation<{ message: string }, ResendOtpRequest>({
      query: payload => ({
        url: API_ENDPOINTS.AUTH.RESEND_OTP,
        method: HTTP_METHODS.POST,
        body: payload,
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        method: HTTP_METHODS.POST,
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: HTTP_METHODS.POST,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
