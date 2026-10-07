import { createApi } from '@reduxjs/toolkit/query/react';
import { ALL_CACHE_TAGS } from './tagTypes';
import { baseQueryWithReauth } from './baseQueryWithReauth';

/**
 * Base RTK Query API client.
 * Uses baseQueryWithReauth for automatic 401 handling & token refresh.
 * Features inject their own endpoints via baseApi.injectEndpoints(...)
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ALL_CACHE_TAGS,
  endpoints: () => ({}),
});
