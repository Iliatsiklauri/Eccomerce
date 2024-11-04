import { Cart } from "../db/entities/Cart";
import { cartService } from "../services/cart.service";
import { productService } from "../services/product.service";
import { ErrorRes, SuccessRes, userType } from "../utils/validation";
import { Request, Response } from "express";

const CartsService = new cartService();
const ProductsService = new productService();

export const getAllCart = async (req: Request, res: Response) => {
  const carts = await CartsService.getAllCart();
  return res.json(carts);
};

export const addItemToCart = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const user = req.user;
  const product = await ProductsService.getProductById(productId);

  if (!product)
    return res.status(404).json(new ErrorRes(404, "Product not fount"));

  const cart = await CartsService.addItemToCart(product, user as userType);
  if (!cart)
    return res
      .status(400)
      .json(new ErrorRes(400, "Error while adding item to cart"));

  return res
    .status(200)
    .json(new SuccessRes(200, "Product added to cart successfully"));
};

// export const getCartById = async (req: Request, res: Response) => {};

// export const updateCart = async (req: Request, res: Response) => {};

export const removeItemFromCart = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const user = req.user;

  const product = await ProductsService.getProductById(productId);
  if (!product) {
    return res.status(404).json(new ErrorRes(404, "Product does not exist"));
  }

  const removedItem = await CartsService.removeItemFromCart(productId, user);
  if (!removedItem)
    return res
      .status(400)
      .json(new ErrorRes(400, "Error while removing product from cart"));

  return res.json(
    new SuccessRes(200, "Product removed from cart successfully")
  );
};
