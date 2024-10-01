import { userType } from "../store/features/usersSlice";

export type commentType = {
  id: number;
  content: string;
  user: userType;
  createdAt: Date;
};
