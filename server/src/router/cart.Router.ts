import express from "express";
import {
  addItemToCart,
  getAllCart,
  removeItemFromCart,
} from "../controllers/cart.controller";

import AdminGuard from "../middleware/AdminGuard";
import AuthGuard from "../middleware/AuthGuard";

const cartRouter = express.Router();

cartRouter.get("/", AdminGuard, getAllCart);
cartRouter.post("/addProducts/:productId", AuthGuard, addItemToCart);
cartRouter.delete("/removeProduct/:productId", AuthGuard, removeItemFromCart);

export default cartRouter;
