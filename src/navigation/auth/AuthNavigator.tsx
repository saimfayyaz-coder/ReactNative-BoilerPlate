import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_ROUTES } from '@/shared/constants';
import { LoginScreen, SignupScreen } from '@/screens/auth';
import { OtpScreen } from '@/screens/common';
import type { AuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AUTH_ROUTES.LOGIN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={AUTH_ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={AUTH_ROUTES.SIGNUP} component={SignupScreen} />
      <Stack.Screen name={AUTH_ROUTES.OTP} component={OtpScreen} />
    </Stack.Navigator>
  );
};
