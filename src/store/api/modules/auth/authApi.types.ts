import type { UserProfile } from '../../../slices/user/userTypes';

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: UserProfile;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password?: string;
}

export interface VerifyOtpRequest {
  code: string;
  destination: string;
}

export interface ResendOtpRequest {
  destination: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

