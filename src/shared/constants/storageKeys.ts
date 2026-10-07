export const STORAGE_KEYS = {
  THEME_MODE: 'app_theme_mode',
  USER_TOKEN: 'app_user_token',
  USER_DATA: 'app_user_data',
  LANGUAGE: 'app_language',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
