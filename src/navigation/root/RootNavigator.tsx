import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '@/store';
import { AuthNavigator } from '../auth';
import { MainNavigator } from '../main';
import { navigationRef } from '../navigationService';
import { useTheme } from '@/shared/hooks';
import { customNavLightTheme, customNavDarkTheme } from '@/shared/theme/navigationTheme';

export const RootNavigator: React.FC = () => {
  const { isDark } = useTheme();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  const navigationTheme = isDark ? customNavDarkTheme : customNavLightTheme;

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
