import React, { useState, useMemo } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import { ThemeContext } from '@/shared/hooks/useTheme';
import { lightTheme, darkTheme, Theme, THEME_MODES, ThemeMode } from '@/shared/theme/colors';
import { storage } from '@/shared/utils/mmkv';
import { STORAGE_KEYS } from '@/shared/constants/storageKeys';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();

  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = storage.getString(STORAGE_KEYS.THEME_MODE);
    if (
      saved === THEME_MODES.LIGHT ||
      saved === THEME_MODES.DARK ||
      saved === THEME_MODES.SYSTEM
    ) {
      return saved as ThemeMode;
    }
    return THEME_MODES.SYSTEM;
  });

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    storage.setString(STORAGE_KEYS.THEME_MODE, newMode);
  };

  const activeTheme: Theme = useMemo(() => {
    if (mode === THEME_MODES.SYSTEM) {
      return systemColorScheme === 'dark' ? darkTheme : lightTheme;
    }
    return mode === THEME_MODES.DARK ? darkTheme : lightTheme;
  }, [mode, systemColorScheme]);

  const value = useMemo(
    () => ({
      theme: activeTheme,
      mode,
      setMode,
      isDark: activeTheme.isDark,
    }),
    [activeTheme, mode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar
        barStyle={activeTheme.isDark ? 'light-content' : 'dark-content'}
      />
      {children}
    </ThemeContext.Provider>
  );
};
