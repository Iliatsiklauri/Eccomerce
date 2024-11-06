import express from "express";
import {
  addCartItem,
  getAllItem,
  getCartByUserId,
  getCartItemById,
  removeCartItem,
  updateCartItem,
} from "../controllers/cartItem.controller";
import AdminGuard from "../middleware/AdminGuard";
import AuthGuard from "../middleware/AuthGuard";

const cartItemRouter = express.Router();

cartItemRouter.get("/", AdminGuard, getAllItem);
cartItemRouter.get("/getCart", AuthGuard, getCartByUserId);
cartItemRouter.get("/:cartItemId", AuthGuard, getCartItemById);

cartItemRouter.put("/:cartItemId", AuthGuard, updateCartItem);

cartItemRouter.post("/:productId", AuthGuard, addCartItem);

cartItemRouter.delete("/:cartItemId", AuthGuard, removeCartItem);

export default cartItemRouter;
