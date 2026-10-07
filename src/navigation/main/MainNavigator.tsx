import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { MAIN_ROUTES, TRANSLATION_KEYS } from '@/shared/constants';
import { HomeScreen } from '@/screens/home';
import { SettingsScreen } from '@/screens/settings';
import { useTheme } from '@/shared/hooks';
import type { MainStackParamList } from '../types';

const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainNavigator: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.bgPrimary,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.actionPrimary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <Tab.Screen
        name={MAIN_ROUTES.HOME}
        component={HomeScreen}
        options={{ title: t(TRANSLATION_KEYS.HOME_TITLE) }}
      />
      <Tab.Screen
        name={MAIN_ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{ title: t(TRANSLATION_KEYS.SETTINGS_TITLE) }}
      />
    </Tab.Navigator>
  );
};
