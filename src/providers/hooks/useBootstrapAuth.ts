import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { bootstrapAuth } from '../bootstrapAuth';

export const useBootstrapAuth = () => {
  const dispatch = useAppDispatch();
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const runBootstrap = async () => {
      try {
        await bootstrapAuth(dispatch);
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    };

    runBootstrap();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return { isBootstrapping };
};
