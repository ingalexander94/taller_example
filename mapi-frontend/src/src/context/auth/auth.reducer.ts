import { AuthState, UserAuth } from "src/interfaces";

type AuthAction = { type: "setUserAuth"; payload: UserAuth | null };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "setUserAuth":
      return {
        ...state,
        user: action.payload ? { ...action.payload } : null,
      };
    default:
      return state;
  }
};
