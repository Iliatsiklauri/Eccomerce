import { Address } from "./Address";
import { Product } from "./Product";
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
  products: OrderItemType[];
  orderStatus: orderStatus;
  createAt: string;
};

export type OrderItemType = Product & {
  quantity: number;
};
