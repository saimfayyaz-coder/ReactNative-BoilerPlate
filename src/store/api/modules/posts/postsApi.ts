import { baseApi } from '../../baseApi';
import { CACHE_TAGS } from '../../tagTypes';
import { API_ENDPOINTS } from '@/shared/constants';
import { Post } from './postsApi.types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => `${API_ENDPOINTS.POSTS.FEED}?_limit=10`,
      providesTags: [CACHE_TAGS.POSTS],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery } = postsApi;
