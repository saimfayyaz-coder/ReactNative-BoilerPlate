import { secureStorage } from '@/shared/utils/secureStorage';
import { authApi } from '@/store/api/modules/auth';
import { logout } from '@/store/slices/auth';
import { HTTP_STATUS, API_ERROR_CODES, STORAGE_KEYS } from '@/shared/constants';
import type { AppDispatch } from '@/store';

export const bootstrapAuth = async (dispatch: AppDispatch): Promise<void> => {
  try {
    const refreshToken = await secureStorage.get(STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      return;
    }

    // On fulfillment, authSlice and authListenerMiddleware automatically update
    // Redux token state and persist rotated refresh token to Keychain.
    await dispatch(
      authApi.endpoints.refreshToken.initiate({ refreshToken }),
    ).unwrap();
  } catch (error: any) {
    // If the server explicitly rejected the refresh token as invalid or expired (401),
    // dispatching logout() automatically triggers authListenerMiddleware to wipe Keychain.
    const isUnauthorized =
      error?.status === HTTP_STATUS.UNAUTHORIZED ||
      error?.status === String(HTTP_STATUS.UNAUTHORIZED) ||
      error?.data?.code === API_ERROR_CODES.REFRESH_TOKEN_EXPIRED ||
      error?.data?.code === API_ERROR_CODES.REFRESH_TOKEN_INVALID;

    if (isUnauthorized) {
      dispatch(logout());
    }
  }
};
