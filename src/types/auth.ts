export interface Credentials {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}