import express from "express";
import {
  getAllMessage,
  getAllUsersFromMessages,
} from "../controllers/message.controller";
import AdminGuard from "../middleware/AdminGuard";
import AuthGuard from "../middleware/AuthGuard";

const messageRouter = express.Router();

messageRouter.get("/:id", AuthGuard, getAllMessage);

messageRouter.get("/", AdminGuard, getAllUsersFromMessages);

export default messageRouter;
