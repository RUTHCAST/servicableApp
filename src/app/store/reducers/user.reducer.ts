import { createReducer, on } from "@ngrx/store";
import * as actions from "../actions";
import { Usuario } from "../../modules/auth/models/usuario.model";

export interface UserState {
  user: Usuario;
}

export const userinitialState: UserState = {
  user: null,
};

const _userReducer = createReducer(
  userinitialState,

  on(actions.setUser, (state, { user }) => {
    return {
      ...state,
      user: { ...user },
    };
  })
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}
