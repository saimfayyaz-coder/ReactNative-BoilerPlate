export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
}
