import { Product } from "./Product";
import { user } from "./User";

export type Comment = {
  id: number;
  content: string;
  user: user | null;
  createdAt: Date | string;
  product: Product | null;
};

export type commentForm = {
  content: string;
};
