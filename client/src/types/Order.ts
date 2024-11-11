import { Address } from "./Address";
import { CartItem } from "./CartItem";
import { user } from "./User";

export enum orderStatus {
  PENDING = "pending",
  FAILED = "failed",
  FULLFILED = "fullfiled",
}

export type Order = {
  id: number;
  user: user;
  address: Address;
  products: CartItem[];
  orderStatus: orderStatus;
  createdAt: Date;
};
