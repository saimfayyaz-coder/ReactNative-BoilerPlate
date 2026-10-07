import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { secureStorage } from '@/shared/utils/secureStorage';
import { STORAGE_KEYS } from '@/shared/constants';
import { authSlice } from '../slices/auth/authSlice';
import { authApi } from '../api/modules/auth';

export const authListenerMiddleware = createListenerMiddleware();

const isAuthSuccess = isAnyOf(
  authSlice.actions.setCredentials,
  authApi.endpoints.login.matchFulfilled,
  authApi.endpoints.verifyOtp.matchFulfilled,
  authApi.endpoints.refreshToken.matchFulfilled,
);

// 1. Centralized Auth Success: Save RefreshToken to OS Keychain
authListenerMiddleware.startListening({
  matcher: isAuthSuccess,
  effect: async action => {
    const refreshToken = action.payload?.refreshToken;
    if (refreshToken) {
      await secureStorage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  },
});

// 2. Centralized Session Cleanup: Remove RefreshToken from OS Keychain
authListenerMiddleware.startListening({
  matcher: isAnyOf(
    authSlice.actions.logout,
    authApi.endpoints.logout.matchFulfilled,
  ),
  effect: async () => {
    await secureStorage.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },
});
