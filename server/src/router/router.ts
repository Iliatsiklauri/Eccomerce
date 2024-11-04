import express from "express";
import usersRouter from "./user.Router";
import authRouter from "./auth.Router";
import AuthGuard from "../middleware/AuthGuard";
import adminRouter from "./admin.Router";
import AdminGuard from "../middleware/AdminGuard";
import productRouter from "./product.Router";
import commentRouter from "./comment.Router";
import categoryRouter from "./category.router";
import addressRouter from "./address.Router";
import cartRouter from "./cart.Router";

const Router = express.Router();

Router.use("/users", AuthGuard, usersRouter);
Router.use("/admin", AdminGuard, adminRouter);
Router.use("/comments", AuthGuard, commentRouter);
Router.use("/cart", cartRouter);
Router.use("/address", addressRouter);
Router.use("/category", categoryRouter);
Router.use("/products", productRouter);
Router.use("/auth", authRouter);

export default Router;
