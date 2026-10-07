import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { useAppDispatch } from '@/store/hooks';
import { bootstrapAuth } from './bootstrapAuth';

export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        await bootstrapAuth(dispatch);
      } catch (error) {
        // Safe fallback in dev/emulators
      } finally {
        await BootSplash.hide({ fade: true }).catch(() => {});
      }
    };

    init();
  }, [dispatch]);

  return <>{children}</>;
};
