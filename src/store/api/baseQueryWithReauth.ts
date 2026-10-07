import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { secureStorage } from '@/shared/utils/secureStorage';
import {
  HTTP_STATUS,
  STORAGE_KEYS,
  API_ENDPOINTS,
  HTTP_METHODS,
} from '@/shared/constants';
import { BASE_URL } from '@/shared/config';
import type { ApiResponse } from '@/shared/types';
import { setCredentials, logout } from '../slices/auth';
import type { RootState } from '../index';

/**
 * Automatically unwrap standard backend ApiResponse envelope:
 * { success: boolean, data: T, message?: string } -> T
 * If data is not wrapped in an ApiResponse envelope, passes payload through untouched.
 */
function unwrapEnvelope<T = unknown>(payload: unknown): T {
  if (
    payload &&
    typeof payload === 'object' &&
    'success' in payload &&
    'data' in payload
  ) {
    return (payload as ApiResponse<T>).data;
  }
  return payload as T;
}

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Mutex lock to prevent multiple simultaneous refresh calls when parallel requests return 401
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === HTTP_STATUS.UNAUTHORIZED) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = (async () => {
        try {
          const refreshToken = await secureStorage.get(
            STORAGE_KEYS.REFRESH_TOKEN,
          );
          if (!refreshToken) {
            return null;
          }

          const refreshResult = await rawBaseQuery(
            {
              url: API_ENDPOINTS.AUTH.REFRESH_TOKEN,
              method: HTTP_METHODS.POST,
              body: { refreshToken },
            },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            const data = unwrapEnvelope<{
              accessToken: string;
              refreshToken?: string;
            }>(refreshResult.data);

            if (data?.accessToken) {
              // Dispatching setCredentials updates auth state and triggers
              // authListenerMiddleware to persist rotated refreshToken to Keychain
              api.dispatch(
                setCredentials({
                  accessToken: data.accessToken,
                  refreshToken: data.refreshToken,
                }),
              );

              return data.accessToken;
            }
          }

          return null;
        } catch {
          return null;
        } finally {
          isRefreshing = false;
        }
      })();
    }

    const newAccessToken = await refreshPromise;

    if (newAccessToken) {
      // Retry the original query with the refreshed access token
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // Refresh token was invalid or expired: dispatching logout resets state
      // and triggers authListenerMiddleware to clean up Keychain
      api.dispatch(logout());
    }
  }

  // Automatically unwrap standard backend ApiResponse envelope on success
  if (result.data) {
    result.data = unwrapEnvelope(result.data);
  }

  return result;
};
