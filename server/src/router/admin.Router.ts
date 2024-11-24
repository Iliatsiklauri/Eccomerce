import express from "express";
import { addAdmin } from "../controllers/user.controller";

const adminRouter = express.Router();

adminRouter.post("/", addAdmin);

export default adminRouter;
