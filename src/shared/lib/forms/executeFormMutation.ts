import { parseApiError, ParsedApiError } from '../errors/parseApiError';
import { API_ERROR_CODES, HTTP_STATUS } from '@/shared/constants';

export interface ExecuteFormMutationOptions<TData> {
  /** The mutation call (must return a promise, e.g. loginMutation(args).unwrap()) */
  action: () => Promise<TData>;
  /** Callback invoked on successful mutation */
  onSuccess?: (data: TData) => void | Promise<void>;
  /** Callback for custom error handling */
  onError?: (parsedError: ParsedApiError) => void;
  /** Sets field-level errors (e.g., { email: 'Invalid email' }) onto component state or form */
  setErrors?: (errors: Record<string, string>) => void;
  /** Function to trigger a toast for general errors (e.g. toast.error) */
  showToast?: (message: string) => void;
  /** Optional function to clear previous errors before submission */
  clearErrors?: () => void;
}

/**
 * Trainee-Friendly Form Mutation Executor
 *
 * Automatically:
 * 1. Executes the mutation promise
 * 2. Catches any API or network error
 * 3. Parses backend error codes into localized, translated messages
 * 4. Routes field-level errors to inputs (e.g., AppInput errorMessage)
 * 5. Dispatches non-global, non-field business errors (e.g. INVALID_CREDENTIALS) to Toast
 *
 * @returns boolean `true` if succeeded, `false` if failed
 */
export async function executeFormMutation<TData>({
  action,
  onSuccess,
  onError,
  setErrors,
  showToast,
  clearErrors,
}: ExecuteFormMutationOptions<TData>): Promise<boolean> {
  if (clearErrors) {
    clearErrors();
  }

  try {
    const data = await action();
    if (onSuccess) {
      await onSuccess(data);
    }
    return true;
  } catch (rawError) {
    const parsed = parseApiError(rawError);

    // Global infrastructure failures (network drops, timeouts, 5xx server errors)
    // are handled centrally by errorInterceptorMiddleware.
    const isGlobalHandled =
      parsed.code === API_ERROR_CODES.NETWORK_ERROR ||
      parsed.code === API_ERROR_CODES.TIMEOUT_ERROR ||
      parsed.code === API_ERROR_CODES.SERVER_ERROR ||
      (typeof parsed.status === 'number' &&
        parsed.status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) ||
      (rawError as any)?.status === API_ERROR_CODES.PARSING_ERROR;

    const hasFieldErrors = Boolean(
      parsed.fieldErrors && Object.keys(parsed.fieldErrors).length > 0,
    );

    // 1. If backend returned field-specific errors, pass to setErrors
    if (hasFieldErrors && setErrors) {
      setErrors(parsed.fieldErrors!);
    } else if (setErrors && !isGlobalHandled) {
      // General error set on 'general' field if desired
      setErrors({ general: parsed.message });
    }

    // 2. Dispatch Toast if NOT handled globally (infrastructure) and NOT an inline field error.
    // The message is translated via the backend CODE (e.g. errors.INVALID_CREDENTIALS).
    if (showToast && !isGlobalHandled && !hasFieldErrors) {
      showToast(parsed.message);
    }

    if (onError) {
      onError(parsed);
    }

    return false;
  }
}
