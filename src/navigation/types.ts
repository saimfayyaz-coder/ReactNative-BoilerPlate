import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { AUTH_ROUTES, MAIN_ROUTES, ROOT_ROUTES } from '@/shared/constants/routes';

export type AuthStackParamList = {
  [AUTH_ROUTES.LOGIN]: undefined;
  [AUTH_ROUTES.SIGNUP]: undefined;
  [AUTH_ROUTES.FORGOT_PASSWORD]?: undefined;
  [AUTH_ROUTES.OTP]: { destination: string; purpose?: string };
};

export type MainStackParamList = {
  [MAIN_ROUTES.HOME]: undefined;
  [MAIN_ROUTES.SETTINGS]: undefined;
  [MAIN_ROUTES.DETAILS]: { id: number; title: string };
};

export type RootStackParamList = {
  [ROOT_ROUTES.AUTH]: undefined;
  [ROOT_ROUTES.MAIN]: undefined;
};

// Convenience typed navigation and route props
export type AuthNavigationProp<RouteName extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, RouteName>;

export type MainNavigationProp<RouteName extends keyof MainStackParamList> =
  NativeStackNavigationProp<MainStackParamList, RouteName>;

export type MainRouteProp<RouteName extends keyof MainStackParamList> =
  RouteProp<MainStackParamList, RouteName>;
