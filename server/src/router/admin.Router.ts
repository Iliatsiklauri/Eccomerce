import express from "express";
import {
  addAdmin,
  deleteAdmin,
  getAllAdmins,
} from "../controllers/auth.controller";

const adminRouter = express.Router();

adminRouter.get("/", getAllAdmins);
adminRouter.delete("/", deleteAdmin);
adminRouter.post("/", addAdmin);

export default adminRouter;
