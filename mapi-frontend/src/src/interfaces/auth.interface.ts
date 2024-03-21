export interface UserAuth {
  names: string;
  surnames: string;
  email: string;
  photo: string | null;
  roles: number[];
}

export interface AuthState {
  user: UserAuth | null;
}

export type ValidateInput = {
  value: string;
  error: string;
  success: string;
  loading: boolean;
};

export interface LoginResponse {
  status: boolean;
  data: LoginUser | null;
  error: string | null;
}

export interface LoginUser {
  token: string;
  user: UserAuth;
}
