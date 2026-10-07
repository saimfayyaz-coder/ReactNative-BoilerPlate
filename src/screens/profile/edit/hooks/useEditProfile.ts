import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';

export const useEditProfile = () => {
  const profile = useAppSelector(state => state.user.profile);
  const [name, setName] = useState(profile?.name || '');
  const [bio, setBio] = useState(profile?.bio || '');

  return {
    name,
    setName,
    bio,
    setBio,
  };
};
