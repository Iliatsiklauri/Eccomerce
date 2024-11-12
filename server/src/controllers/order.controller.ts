import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { ProductService } from "../services/product.service";
import { ErrorRes, SuccessRes } from "../utils/validation";
import { UserService } from "../services/user.service";
import { CartItem } from "../db/entities/CartItem";
import { CartItemService } from "../services/cartItem.service";

const ordersService = new OrderService();
const productsService = new ProductService();
const usersService = new UserService();
const CartItemsService = new CartItemService();

export const getAllOrders = async (req: Request, res: Response) => {
  const AllOrders = await ordersService.getAllOrders();
  res.json(AllOrders);
};

export const getUserOrders = async (req: Request, res: Response) => {
  const UserOrders = await ordersService.getUserOrders(req.user.id);
  res.json(UserOrders);
};
/// hreeerer

export const addOrderByCart = async (req: Request, res: Response) => {
  const user = await usersService.getUserById(req.user.id);

  if (!user.Address)
    return res
      .status(400)
      .json(new ErrorRes(400, "User does not have address property"));

  if (user.cartItems.length === 0)
    return res.status(400).json(new ErrorRes(400, "Your cart is empty"));

  await ordersService.addOrderBycart(user.cartItems, user);

  user.cartItems.forEach(async (cartItem: CartItem) => {
    await productsService.updateProductInStock(
      cartItem.product.id,
      cartItem.quantity
    );

    await CartItemsService.removeCartItem(cartItem.id);
  });

  res.status(200).json(new SuccessRes(200, "Order placed successfully"));
};

//dfasjiasddasuidashuidasih

export const addOrderById = async (req: Request, res: Response) => {
  const IdArray = req.body.IdArray;
  const quantity = req.body.quantity;

  if (!IdArray || !quantity)
    return res
      .status(400)
      .json(new ErrorRes(400, "quntity and product Id are required"));

  let errors = [];

  const user = await usersService.getRawUserById(req.user.id);
  if (!user.Address)
    return res
      .status(400)
      .json(new ErrorRes(400, "User does not have address property"));

  const productsArray = await Promise.all(
    IdArray.map((id) => productsService.getProductById(id))
  );

  productsArray.forEach((product) => {
    if (!product) {
      errors.push(`Product not found with the id`);
      return null;
    }
  });

  if (errors.length > 0) return res.status(400).json(new ErrorRes(400, errors));

  productsArray.forEach(async (product) => {
    await productsService.updateProductInStock(product.id, quantity);
  });

  const order = await ordersService.addOrder(productsArray, user, quantity);

  if (!order)
    return res.status(400).json(new ErrorRes(400, "Could not add an Order"));

  return res.json(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const deletedOrder = await ordersService.deleteOrder(req.params.id);
  if (!deletedOrder)
    return res.status(400).json(new ErrorRes(400, "Could not find an Order"));

  return res
    .status(200)
    .json(new SuccessRes(200, "Order deleted successfully"));
};
