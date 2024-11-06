import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import usersSlice from "./features/usersSlice";
import categorySlice from "./features/categorySlice";
import cartSlice from "./features/cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: usersSlice,
    category: categorySlice,
    cart: cartSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
