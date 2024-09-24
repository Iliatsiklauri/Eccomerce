import express from "express";
import { createUser } from "../controllers/user.controller";
import { signIn } from "../controllers/auth.controller";
const authRouter = express.Router();

authRouter.post("/sign-up", createUser);
authRouter.post("/sign-in", signIn);

export default authRouter;
