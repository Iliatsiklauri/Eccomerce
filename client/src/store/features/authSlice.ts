import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  isLoggedIn: boolean;
  email?: string;
  role?: string;
  fullname?: string;
};

const initialState: stateType = {
  isLoggedIn: false,
  fullname: undefined,
  email: undefined,
  role: undefined,
};

const authSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{ email: string; fullname: string; role: string }>
    ) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
      state.role = action.payload.role;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.email = undefined;
      state.role = undefined;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
