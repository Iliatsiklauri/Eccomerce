import { Product } from "./Product";
import { user } from "./User";

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
  user: user;
};
