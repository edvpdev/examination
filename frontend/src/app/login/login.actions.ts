import { createAction, props } from "@ngrx/store";
import { User } from "../../../shared/interfaces/user";

export const loginSuccessful = createAction(
  "[Login Component] Login Successfull",
  props<{ user: User; authJwtToken: string }>()
);

export const loginFailed = createAction("[Login Component] Login Failed");
