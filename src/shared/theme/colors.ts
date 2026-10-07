export interface ColorPalette {
  bgPrimary: string;
  surface: string;
  surfaceSecondary: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  actionPrimary: string;
  actionSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  white: string;
  black: string;
  toastBg: string;
  toastText: string;
}

export const lightColors: ColorPalette = {
  bgPrimary: '#FFFFFF',
  surface: '#F8F9FA',
  surfaceSecondary: '#F1F3F5',
  textPrimary: '#1A1A1A',
  textSecondary: '#6C757D',
  textTertiary: '#ADB5BD',
  actionPrimary: '#0095F6',
  actionSecondary: '#EFEFEF',
  border: '#DBDBDB',
  error: '#ED4956',
  success: '#28A745',
  warning: '#FFC107',
  white: '#FFFFFF',
  black: '#000000',
  toastBg: '#262626',
  toastText: '#FFFFFF',
};

export const darkColors: ColorPalette = {
  bgPrimary: '#000000',
  surface: '#121212',
  surfaceSecondary: '#1E1E1E',
  textPrimary: '#F5F5F5',
  textSecondary: '#A8A8A8',
  textTertiary: '#65676B',
  actionPrimary: '#0095F6',
  actionSecondary: '#262626',
  border: '#262626',
  error: '#ED4956',
  success: '#28A745',
  warning: '#FFC107',
  white: '#FFFFFF',
  black: '#000000',
  toastBg: '#363636',
  toastText: '#FFFFFF',
};

export interface Theme {
  colors: ColorPalette;
  isDark: boolean;
}

export const lightTheme: Theme = {
  colors: lightColors,
  isDark: false,
};

export const darkTheme: Theme = {
  colors: darkColors,
  isDark: true,
};

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];
