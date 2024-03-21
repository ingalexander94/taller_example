import { createContext } from "react";
import { AuthState, UserAuth } from "src/interfaces";

export type AuthContextProps = {
  authState: AuthState;
  setUserAuth: (user: UserAuth | null) => void;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);
