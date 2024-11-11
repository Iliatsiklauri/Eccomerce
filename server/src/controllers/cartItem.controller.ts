import { Request, Response } from "express";
import { CartItemService } from "../services/cartItem.service";
import { UserService } from "../services/user.service";
import { ProductService } from "../services/product.service";
import { ErrorRes, SuccessRes, userType } from "../utils/validation";

const cartItemService = new CartItemService();
const userService = new UserService();
const productService = new ProductService();

export const getAllItem = async (req: Request, res: Response) => {
  const cartItems = await cartItemService.getAll();
  return res.json(cartItems);
};

export const getCartItemById = async (req: Request, res: Response) => {
  const cartItemId = Number(req.params.cartItemId);

  if (isNaN(cartItemId)) {
    return res.status(400).json(new ErrorRes(400, "Invalid Id"));
  }

  const cartItem = await cartItemService.getCartItemById(
    Number(req.params.cartItemId)
  );
  if (!cartItem)
    return res.status(404).json(new ErrorRes(404, "Cart item not found"));

  return res.json(cartItem);
};

export const getCartByUserId = async (req: Request, res: Response) => {
  const user = req.user as userType;
  const cartItem = await cartItemService.getWholeCartByUserId(Number(user.id));

  if (!cartItem)
    return res.status(404).json(new ErrorRes(404, "Cart item not found"));

  return res.json(cartItem);
};

export const addCartItem = async (req: Request, res: Response) => {
  const target = req.user as userType;
  const quantity = req.body.quantity;
  if (!quantity)
    return res.status(400).json(new ErrorRes(400, "quantity is required"));

  const product = await productService.getProductById(req.params.productId);
  const user = await userService.getUserById(target.id);

  if (quantity > product.inStock) {
    return res
      .status(400)
      .json(new ErrorRes(400, `There is only ${product.inStock} product left`));
  }

  if (!product)
    return res.status(404).json(new ErrorRes(404, "Product not found"));

  const addedItem = await cartItemService.addCartItem(product, user, quantity);
  const usersCart = await cartItemService.getWholeCartByUserId(user.id);

  if (addedItem === 400) {
    return res
      .status(addedItem)
      .json(new ErrorRes(addedItem, "Product already exists in your cart"));
  }

  return res.json(usersCart);
};

export const updateCartItem = async (req: Request, res: Response) => {
  const cartItemId = req.params.cartItemId;
  let quantity = req.body.quantity;

  const cartItem = await cartItemService.getCartItemById(Number(cartItemId));
  if (!cartItem)
    return res.status(404).json(new ErrorRes(404, "Cart Item not found"));

  if (cartItem.product.inStock < quantity)
    return res
      .status(400)
      .json(
        new ErrorRes(
          400,
          `There is only ${cartItem.product.inStock} product left`
        )
      );

  if (!quantity)
    return res.status(400).json(new ErrorRes(400, "Quantity is required"));

  if (typeof quantity !== "number" || quantity <= 0) {
    return res
      .status(400)
      .json(new ErrorRes(400, "Quantity must be a positive number"));
  }
  const updatedCartItem = await cartItemService.updateCartItem(
    cartItemId,
    quantity
  );

  if (!updatedCartItem)
    return res.status(404).json(new ErrorRes(404, "Cart Item not found"));

  const usersCart = await cartItemService.getWholeCartByUserId(req.user.id);

  return res.json(usersCart);
};

export const removeCartItem = async (req: Request, res: Response) => {
  const productId = req.params.cartItemId;
  const deletedCartItem = await cartItemService.removeCartItem(productId);
  if (!deletedCartItem)
    return res.status(404).json(new ErrorRes(404, "CartItem not found"));

  const usersCart = await cartItemService.getWholeCartByUserId(req.user.id);

  res.json(usersCart);
};
