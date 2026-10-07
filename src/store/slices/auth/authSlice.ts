import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import { AuthState } from './authTypes';
import { authApi } from '../../api/modules/auth';

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  userId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken?: string;
        userId?: string | null;
      }>,
    ) => {
      state.token = action.payload.accessToken;
      state.isAuthenticated = Boolean(action.payload.accessToken);
      if (action.payload.userId !== undefined) {
        state.userId = action.payload.userId;
      }
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchFulfilled,
          authApi.endpoints.verifyOtp.matchFulfilled,
          authApi.endpoints.refreshToken.matchFulfilled,
        ),
        (state, action) => {
          state.isAuthenticated = true;
          state.token = action.payload.accessToken;
          if ('user' in action.payload && action.payload.user?.id) {
            state.userId = action.payload.user.id;
          }
        },
      )
      .addMatcher(
        authApi.endpoints.logout.matchFulfilled,
        state => {
          state.isAuthenticated = false;
          state.token = null;
          state.userId = null;
        },
      );
  },
});

export const { setToken, setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
