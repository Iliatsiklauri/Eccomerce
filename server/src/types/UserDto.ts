import { UserRole } from "../db/entities/User";

export type CreateUserDto = {
  fullname: string;
  email: string;
  password: string;
  role?: UserRole;
};
