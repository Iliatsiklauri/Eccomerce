import { createSlice } from "@reduxjs/toolkit";
export type userType = {
  id: number;
  fullname: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  initialAdmin: boolean;
};
type UsersState = {
  users: userType[] | undefined;
};
const initialState: UsersState = {
  users: undefined,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
