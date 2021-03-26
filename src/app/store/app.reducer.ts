import { ActionReducerMap } from "@ngrx/store";
import * as reducer from "./reducers";

export interface AppState {
  user: reducer.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: reducer.userReducer,
};
