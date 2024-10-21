import express from "express";

const orderRouter = express.Router();

orderRouter.get("/");
orderRouter.get("/:id");
orderRouter.post("/:id");
orderRouter.put("/:id");
orderRouter.delete("/:id");

export default orderRouter;
