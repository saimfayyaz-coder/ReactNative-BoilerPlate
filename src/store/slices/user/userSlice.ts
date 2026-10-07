import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import { UserState, UserProfile } from './userTypes';
import { authSlice } from '../auth/authSlice';
import { authApi } from '../../api/modules/auth';

const initialState: UserState = {
  profile: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    clearUserProfile: state => {
      state.profile = null;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchFulfilled,
          authApi.endpoints.verifyOtp.matchFulfilled,
        ),
        (state, action) => {
          if (action.payload.user) {
            state.profile = action.payload.user;
          }
        },
      )
      .addMatcher(
        isAnyOf(
          authSlice.actions.logout,
          authApi.endpoints.logout.matchFulfilled,
        ),
        state => {
          state.profile = null;
        },
      );
  },
});

export const { setUserProfile, updateUserProfile, clearUserProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;
