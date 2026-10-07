export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
}

export interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
}
