import { CategoryType } from "@/src/utils/data";
import { createSlice } from "@reduxjs/toolkit";

type categoryState = {
  category: CategoryType[] | [];
  loading: boolean;
};
const initialState: categoryState = {
  category: [],
  loading: true,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCategory, setLoading } = categorySlice.actions;
export default categorySlice.reducer;
