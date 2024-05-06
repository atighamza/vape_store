import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/slices/userSlice";
import AuthReducer from "./features/slices/authSlice";
const store = configureStore({
  reducer: {
    user: UserReducer,
    auth: AuthReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//to dispatch outside of components
export const dispatchOutside = store.dispatch;

export default store;
