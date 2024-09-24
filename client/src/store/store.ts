import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import usersSlice from "./features/usersSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: usersSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
