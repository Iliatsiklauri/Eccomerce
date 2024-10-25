import express from "express";
import {
  createComment,
  deleteComment,
  getComments,
  getSingleComment,
  updateComment,
} from "../controllers/comment.controller";
import AdminGuard from "../middleware/AdminGuard";
const commentRouter = express.Router();

commentRouter.get("/", getComments);
commentRouter.get("/:id", getSingleComment);
commentRouter.post("/:id", createComment);
commentRouter.put("/:id", updateComment);
commentRouter.delete("/:id", AdminGuard, deleteComment);

export default commentRouter;
