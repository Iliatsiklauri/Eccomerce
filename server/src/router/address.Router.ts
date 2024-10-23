import express from "express";
import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getSingleAddress,
  updateAddress,
} from "../controllers/address.controller";

const addressRouter = express.Router();

addressRouter.get("/", getAllAddresses);
addressRouter.get("/:id", getSingleAddress);
addressRouter.post("/:id", createAddress);
addressRouter.put("/:id", updateAddress);
addressRouter.delete("/:id", deleteAddress);

export default addressRouter;
