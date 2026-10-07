import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ToastPayload,
  ToastState,
  TOAST_TYPE,
  TOAST_POSITION,
} from './toastTypes';

const initialState: ToastState = {
  visible: false,
  message: '',
  type: TOAST_TYPE.INFO,
  duration: 3000,
  position: TOAST_POSITION.BOTTOM,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastPayload | string>) => {
      if (typeof action.payload === 'string') {
        state.message = action.payload;
        state.type = TOAST_TYPE.INFO;
        state.duration = 3000;
        state.position = TOAST_POSITION.BOTTOM;
      } else {
        state.message = action.payload.message;
        state.type = action.payload.type || TOAST_TYPE.INFO;
        state.duration = action.payload.duration ?? 3000;
        state.position = action.payload.position ?? TOAST_POSITION.BOTTOM;
      }
      state.visible = true;
    },
    hideToast: state => {
      state.visible = false;
      state.message = '';
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
