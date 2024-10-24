import { Address } from "./Address";

export type user = {
  fullname: string;
  email: string;
  id: string;
  role: string;
  Address: Address;
};

export type SignUp = {
  fullname?: string;
  email: string;
  password: string;
};

export type SignIn = {
  email: string;
  password: string;
};
