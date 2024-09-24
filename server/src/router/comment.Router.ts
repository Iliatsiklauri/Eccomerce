import express from "express";
import {
  createComment,
  deleteComment,
  getComments,
  getSingleComment,
  updateComment,
} from "../controllers/comment.controller";
const commentRouter = express.Router();

commentRouter.get("/", getComments);
commentRouter.get("/:id", getSingleComment);
commentRouter.post("/:id", createComment);
commentRouter.put("/:id", updateComment);
commentRouter.delete("/:id", deleteComment);

export default commentRouter;
