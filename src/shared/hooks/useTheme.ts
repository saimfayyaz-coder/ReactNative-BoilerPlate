import { useContext, createContext } from 'react';
import { Theme, lightTheme, ThemeMode, THEME_MODES } from '../theme/colors';

export interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  mode: THEME_MODES.SYSTEM,
  setMode: () => {},
  isDark: false,
});

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
