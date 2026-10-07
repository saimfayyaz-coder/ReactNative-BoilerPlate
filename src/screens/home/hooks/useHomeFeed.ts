import { useGetPostsQuery } from '@/store';

export const useHomeFeed = () => {
  const { data: posts, isLoading, isError, refetch, isFetching } = useGetPostsQuery();

  return {
    posts,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};
