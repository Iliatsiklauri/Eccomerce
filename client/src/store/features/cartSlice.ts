import { CartItem } from "@/src/types/CartItem";
import { createSlice } from "@reduxjs/toolkit";

type CartState = {
  cart: CartItem[] | [];
};

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { setCart } = cartSlice.actions;
