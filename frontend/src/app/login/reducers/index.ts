import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { User } from "../../../../shared/interfaces/user";
import { LoginActions } from "../action-types";

export const loginFeatureKey = "login";

export interface LoginState {
  user: User;
  authJwtToken: string;
}

export const initialLoginState: LoginState = {
  user: undefined,
  authJwtToken: "",
};

export const loginSuccessfullReducer = createReducer(
  initialLoginState,
  on(LoginActions.loginSuccessful, (state, action) => {
    return {
      user: action.user,
      authJwtToken: action.authJwtToken,
    };
  })
);
