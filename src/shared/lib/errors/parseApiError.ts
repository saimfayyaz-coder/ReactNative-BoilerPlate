import i18n from '@/shared/translations/i18n';
import { API_ERROR_CODES, HTTP_STATUS, TRANSLATION_KEYS } from '@/shared/constants';

export interface ParsedApiError {
  message: string;
  code?: string;
  status?: number | string;
  fieldErrors?: Record<string, string>;
  isNetworkError: boolean;
  isServerError: boolean;
  raw?: unknown;
}

export function parseApiError(error: unknown): ParsedApiError {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const err = error as any;

    // 1. RTK Query Fetch / Network Offline Error
    if (err.status === API_ERROR_CODES.FETCH_ERROR) {
      const codeKey = `errors.${API_ERROR_CODES.NETWORK_ERROR}`;
      return {
        message: i18n.exists(codeKey)
          ? i18n.t(codeKey)
          : i18n.t(TRANSLATION_KEYS.COMMON_ERROR_NETWORK),
        code: API_ERROR_CODES.NETWORK_ERROR,
        status: 0,
        isNetworkError: true,
        isServerError: false,
        raw: error,
      };
    }

    // 2. Request Timeout Error
    if (err.status === API_ERROR_CODES.TIMEOUT_ERROR) {
      const codeKey = `errors.${API_ERROR_CODES.TIMEOUT_ERROR}`;
      return {
        message: i18n.exists(codeKey)
          ? i18n.t(codeKey)
          : i18n.t(TRANSLATION_KEYS.COMMON_ERROR_TIMEOUT),
        code: API_ERROR_CODES.TIMEOUT_ERROR,
        status: 408,
        isNetworkError: true,
        isServerError: false,
        raw: error,
      };
    }

    // 3. RTK Query Parsing Error
    if (err.status === API_ERROR_CODES.PARSING_ERROR) {
      const codeKey = `errors.${API_ERROR_CODES.SERVER_ERROR}`;
      const httpStatus =
        typeof err.originalStatus === 'number'
          ? err.originalStatus
          : HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return {
        message: i18n.exists(codeKey)
          ? i18n.t(codeKey)
          : i18n.t(TRANSLATION_KEYS.COMMON_ERROR_SERVER),
        code: API_ERROR_CODES.SERVER_ERROR,
        status: httpStatus,
        isNetworkError: false,
        isServerError: true,
        raw: error,
      };
    }

    // 4. HTTP 5xx Server Error
    if (typeof err.status === 'number' && err.status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
      const codeKey = `errors.${API_ERROR_CODES.SERVER_ERROR}`;
      return {
        message: i18n.exists(codeKey)
          ? i18n.t(codeKey)
          : i18n.t(TRANSLATION_KEYS.COMMON_ERROR_SERVER),
        code: API_ERROR_CODES.SERVER_ERROR,
        status: err.status,
        isNetworkError: false,
        isServerError: true,
        raw: error,
      };
    }

    // 5. Extract data payload from response
    const data = err.data as
      | {
          message?: string;
          code?: string;
          errorCode?: string;
          errors?: Record<string, string | string[]>;
        }
      | undefined;

    // Backend attaches code (e.g. 'INVALID_CREDENTIALS', 'EMAIL_ALREADY_EXISTS')
    const serverCode = data?.code ?? data?.errorCode ?? API_ERROR_CODES.UNKNOWN;
    const i18nKey = `errors.${serverCode}`;

    // Prefer translated string via backend CODE, fallback to backend English message, then unknown
    const message = i18n.exists(i18nKey)
      ? i18n.t(i18nKey)
      : data?.message ||
        (typeof err.error === 'string'
          ? err.error
          : i18n.t(`errors.${API_ERROR_CODES.UNKNOWN}`));

    // 6. Parse field-level validation errors
    const rawFieldErrors = data?.errors;
    let fieldErrors: Record<string, string> | undefined;

    if (
      rawFieldErrors &&
      typeof rawFieldErrors === 'object' &&
      Object.keys(rawFieldErrors).length > 0
    ) {
      fieldErrors = Object.fromEntries(
        Object.entries(rawFieldErrors).map(([field, msgs]) => {
          const raw = Array.isArray(msgs) ? msgs[0] ?? '' : String(msgs);

          // 1. Direct error code translation (e.g. errors.EMAIL_ALREADY_EXISTS)
          const directCodeKey = `errors.${raw}`;
          if (i18n.exists(directCodeKey)) {
            return [field, i18n.t(directCodeKey)];
          }

          // 2. Direct validation schema translation (e.g. validation.emailRequired)
          const validationKey = `validation.${raw}`;
          if (i18n.exists(validationKey)) {
            return [field, i18n.t(validationKey)];
          }

          // 3. Fallback to serverCode translation if available
          if (
            serverCode &&
            serverCode !== API_ERROR_CODES.UNKNOWN &&
            i18n.exists(`errors.${serverCode}`)
          ) {
            return [field, i18n.t(`errors.${serverCode}`)];
          }

          return [field, raw];
        }),
      );
    }

    return {
      message,
      code: serverCode,
      status:
        typeof err.status === 'number'
          ? err.status
          : typeof err.originalStatus === 'number'
          ? err.originalStatus
          : undefined,
      fieldErrors,
      isNetworkError: false,
      isServerError: false,
      raw: error,
    };
  }

  // 7. Generic JavaScript error fallback
  if (error instanceof Error) {
    return {
      message: error.message || i18n.t(`errors.${API_ERROR_CODES.UNKNOWN}`),
      code: API_ERROR_CODES.UNKNOWN,
      isNetworkError: false,
      isServerError: false,
      raw: error,
    };
  }

  return {
    message: i18n.t(`errors.${API_ERROR_CODES.UNKNOWN}`),
    code: API_ERROR_CODES.UNKNOWN,
    isNetworkError: false,
    isServerError: false,
    raw: error,
  };
}
