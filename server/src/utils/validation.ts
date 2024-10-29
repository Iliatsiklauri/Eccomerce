import Joi from "joi";
import { UserRole } from "../db/entities/User";
import { Comment } from "../db/entities/Comment";
import { Address } from "../db/entities/Address";

export const userSchema = Joi.object({
  fullname: Joi.string()
    .pattern(new RegExp("^[A-Za-z]+(?: [A-Za-z]+)+$"))
    .required(),
  email: Joi.string().required().pattern(new RegExp("^[^@]+@[^@]+.[^@]+$")),
  password: Joi.string().required().min(8),
}).options({ abortEarly: false });

export const logInSchema = Joi.object({
  email: Joi.string().required().pattern(new RegExp("^[^@]+@[^@]+.[^@]+$")),
  password: Joi.string().required().min(8),
}).options({ abortEarly: false });

export const productSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  salePrice: Joi.number().required(),
  brand: Joi.string().required(),
  category: Joi.number().required(),
  inStock: Joi.number().required(),
  pinned: Joi.string().valid("true", "false"),
}).options({ abortEarly: false });

export const createAddressSchema = Joi.object({
  name: Joi.string().required(),
  additionalInfo: Joi.string().required(),
  street: Joi.string().required(),
  lng: Joi.number().required(),
  lat: Joi.number().required(),
}).options({ abortEarly: false });

export const updateAddressSchema = Joi.object({
  name: Joi.string(),
  additionalInfo: Joi.string(),
  street: Joi.string(),
  lng: Joi.number(),
  lat: Joi.number(),
}).options({ abortEarly: false });

export const updateProductSchema = Joi.object({
  pinnedImage: Joi.string().optional(),
  image: Joi.string().optional(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  salePrice: Joi.number().optional(),
  brand: Joi.string().optional(),
  category: Joi.number().optional(),
  inStock: Joi.number().optional(),
  pinned: Joi.string().valid("true", "false").optional(),
}).options({ abortEarly: false });

export const createCategorySchema = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().required(),
  pinned: Joi.boolean(),
}).options({ abortEarly: false });

export const updateCategoryShema = Joi.object({
  title: Joi.string(),
  link: Joi.string(),
  pinned: Joi.boolean(),
}).options({ abortEarly: false });

export const createCommentSchema = Joi.object({
  content: Joi.string().required(),
});

export class userType {
  fullname: string;
  email: string;
  address: Address;
  password: string;
  role: UserRole;
}

export class categoryType {
  id: number;
  pinned: boolean;
  title: string;
  image: string;
}
export class updateCategoryType {
  id: number;
  pinned: string | boolean;
  title: string;
  image: string;
}

export function ErrorRes(status: number, message: string | string[]) {
  this.status = status;
  this.error = {
    message,
  };
}

export function SuccessRes(status: number, message: string, token?: string) {
  this.status = status;
  this.success = {
    message,
    ...(token && { token }),
  };
}
