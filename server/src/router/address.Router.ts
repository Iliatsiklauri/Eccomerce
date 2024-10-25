import express from "express";
import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getSingleAddress,
  updateAddress,
} from "../controllers/address.controller";
import AuthGuard from "../middleware/AuthGuard";
import AdminGuard from "../middleware/AdminGuard";

const addressRouter = express.Router();

addressRouter.get("/", AdminGuard, getAllAddresses);
addressRouter.get("/:id", AuthGuard, getSingleAddress);
addressRouter.post("/:id", AuthGuard, createAddress);
addressRouter.put("/:id", AuthGuard, updateAddress);
addressRouter.delete("/:id", AuthGuard, deleteAddress);

export default addressRouter;
