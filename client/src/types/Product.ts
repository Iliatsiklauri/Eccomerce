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
  pinnedImageFilePath: string;
  category: CategoryType;
  inStock: number;
  brand: string;
  pinned: boolean;
  createdAt: string;
  comments: commentType[];
};

export type createProductType = {
  title: string;
  description: string;
  price: number | string;
  salePrice: number | string;
  image: File | null;
  pinnedImage: File | null;
  category: string | null;
  inStock: number | string;
  brand: string;
  pinned: boolean;
  [key: string]: string | File | undefined | number | null | boolean;
};

export const defaultValues = {
  title: "",
  brand: "",
  category: null,
  description: "",
  image: null,
  pinnedImage: null,
  inStock: "",
  salePrice: "",
  price: "",
  pinned: false,
};
