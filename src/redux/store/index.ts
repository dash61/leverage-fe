import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers/index";

// todo - install and use here the saga middleware, add to configureStore
const store = configureStore({reducer: rootReducer});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
