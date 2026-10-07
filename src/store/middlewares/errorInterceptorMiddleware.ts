import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { parseApiError } from '@/shared/lib/errors';
import { showToast } from '../slices/utility';

/**
 * Global Error Interceptor Middleware
 *
 * Automatically intercepts any rejected API query or mutation.
 * For global infrastructure failures (network drops / timeouts / 5xx server errors),
 * it displays an error Toast so screens and trainees don't need boilerplate try/catch.
 */
export const errorInterceptorMiddleware: Middleware = store => next => action => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as any;

    const skipGlobalErrorToast =
      Boolean(payload?.skipGlobalErrorToast) ||
      Boolean(payload?.data?.skipGlobalErrorToast) ||
      Boolean((action as any)?.meta?.baseQueryMeta?.skipGlobalErrorToast) ||
      Boolean((action as any)?.meta?.arg?.skipGlobalErrorToast);

    if (skipGlobalErrorToast) {
      return next(action);
    }

    const parsed = parseApiError(action.payload);

    // Only fire global toasts for offline network drops or 5xx server failures
    // (4xx client/form validation errors are handled at the form/screen level)
    if (parsed.isNetworkError || parsed.isServerError) {
      store.dispatch(
        showToast({
          message: parsed.message,
          type: 'error',
        }),
      );
    }
  }

  return next(action);
};
