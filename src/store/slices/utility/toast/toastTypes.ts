export const TOAST_TYPE = {
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
} as const;

export type ToastType = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];

export const TOAST_POSITION = {
  BOTTOM: 'bottom',
  MIDDLE: 'middle',
} as const;

export type ToastPosition = (typeof TOAST_POSITION)[keyof typeof TOAST_POSITION];

export interface ToastPayload {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}

export interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
  duration: number;
  position: ToastPosition;
}
