import express from "express";
import {
  addOrderByCart,
  addOrderById,
  deleteOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/order.controller";
import AdminGuard from "../middleware/AdminGuard";
import AuthGuard from "../middleware/AuthGuard";

const orderRouter = express.Router();

orderRouter.get("/", AdminGuard, getAllOrders);

orderRouter.get("/user", AuthGuard, getUserOrders);

orderRouter.put("/:id", AdminGuard, updateOrderStatus);

orderRouter.post("/cart", AuthGuard, addOrderByCart);

orderRouter.delete("/:id", AuthGuard, deleteOrder);

orderRouter.post("/", AuthGuard, addOrderById);

export default orderRouter;
