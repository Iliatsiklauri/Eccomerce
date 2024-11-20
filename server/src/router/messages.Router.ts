import express from "express";
import { getAllMessage } from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter.get("/:id", getAllMessage);

export default messageRouter;
