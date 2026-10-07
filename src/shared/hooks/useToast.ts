import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showToast, hideToast, ToastPayload, TOAST_TYPE } from '@/store';

export const useToast = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector(state => state.toast);

  const triggerToast = useCallback(
    (messageOrPayload: string | ToastPayload) => {
      dispatch(showToast(messageOrPayload));
    },
    [dispatch],
  );

  const showError = useCallback(
    (message: string, duration?: number) => {
      dispatch(showToast({ message, type: TOAST_TYPE.ERROR, duration }));
    },
    [dispatch],
  );

  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      dispatch(showToast({ message, type: TOAST_TYPE.SUCCESS, duration }));
    },
    [dispatch],
  );

  const dismissToast = useCallback(() => {
    dispatch(hideToast());
  }, [dispatch]);

  return {
    show: triggerToast,
    error: showError,
    success: showSuccess,
    hide: dismissToast,
    toast,
  };
};
