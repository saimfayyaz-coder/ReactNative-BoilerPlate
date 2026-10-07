export const ROOT_ROUTES = {
  AUTH: 'Auth',
  MAIN: 'Main',
} as const;

export const AUTH_ROUTES = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  FORGOT_PASSWORD: 'ForgotPassword',
  OTP: 'Otp',
} as const;

export const MAIN_ROUTES = {
  HOME: 'Home',
  SETTINGS: 'Settings',
  DETAILS: 'Details',
} as const;

export type RootRoute = (typeof ROOT_ROUTES)[keyof typeof ROOT_ROUTES];
export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];
export type MainRoute = (typeof MAIN_ROUTES)[keyof typeof MAIN_ROUTES];
