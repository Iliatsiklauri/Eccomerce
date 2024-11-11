import { Category } from "../db/entities/Category";
import { categoryType } from "../utils/validation";

export type createProductDto = {
  title: string;
  description: string;
  price: number;
  salePrice: number;
  image: Express.Multer.File;
  pinnedImage: Express.Multer.File;
  brand: string;
  category: Category;
  inStock: number;
  pinned: string;
};

export class productType {
  id: number;
  title: string;
  description: string;
  price: number;
  salePrice: number;
  image: string;
  pinnedImage: string;
  pinnedImageFilePath: string;
  brand: string;
  category: categoryType;
  inStock: number;
  filepath: string;
  createdAt: string;
  pinned: boolean | string;
  comments: Comment[];
}

export type OrderItemType = productType & {
  quantity: number;
};

export type updateProductDto = {
  title?: string;
  description?: string;
  price?: number;
  salePrice?: number;
  brand?: string;
  category?: Category;
  inStock?: number;
  pinned?: boolean;
  image?: string;
  pinnedImage?: string;
};
export type updateProductFilesDto = {
  image?: Express.Multer.File | null;
  pinnedImage?: Express.Multer.File | null;
};
