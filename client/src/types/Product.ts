import { CategoryType } from "./Category";
import { commentType } from "./Comment";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  salePrice: number;
  image: string;
  pinnedImage: string;
  filepath: string;
  category: CategoryType;
  inStock: number;
  pinned: boolean;
  createdAt: string;
  comments: commentType[];
};

export type createProductType = {
  title: string;
  description: string;
  price: number | null;
  salePrice: number | null;
  image: File | null;
  category: string;
  inStock: number | null;
  pinned: boolean;
};
