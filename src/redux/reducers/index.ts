import { combineReducers } from "redux";

import userReducer from "./userReducer";

export const rootReducer = combineReducers({
  users: userReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
