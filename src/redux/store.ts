import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./signUpSlice";
import listReducer from "./listSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    list: listReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
