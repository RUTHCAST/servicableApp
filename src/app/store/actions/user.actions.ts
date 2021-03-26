import { createAction, props } from "@ngrx/store";
import { Usuario } from "../../modules/auth/models/usuario.model";

export const setUser = createAction(
  "[user] setUser",
  props<{ user: Usuario }>()
);
