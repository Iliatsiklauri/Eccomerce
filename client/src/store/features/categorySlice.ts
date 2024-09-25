import { Category } from "@/src/utils/data";
import { createSlice } from "@reduxjs/toolkit";

type categoryState = {
  category: Category[] | undefined;
};
const initialState: categoryState = {
  category: undefined,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
