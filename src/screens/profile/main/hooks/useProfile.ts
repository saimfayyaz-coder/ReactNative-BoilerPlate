import { useAppSelector } from '@/store/hooks';

export const useProfile = () => {
  const profile = useAppSelector(state => state.user.profile);

  return {
    profile,
  };
};
