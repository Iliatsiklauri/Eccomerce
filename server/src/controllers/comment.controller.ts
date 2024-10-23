import { Request, Response } from "express";
import { commentService } from "../services/comment.service";
import { productService } from "../services/product.service";
import { createCommentSchema, ErrorRes, SuccessRes } from "../utils/validation";

const commentsService = new commentService();

export const getComments = async (req: Request, res: Response) => {
  const comments = await commentsService.getComments();
  return res.status(200).json(comments);
};

export const getSingleComment = async (req: Request, res: Response) => {
  const comment = await commentsService.getSingleComment(req.params.id);
  if (!comment)
    return res.status(404).json(new ErrorRes(404, "Comment not found"));
  return res.status(200).json(comment);
};

export const createComment = async (req: Request, res: Response) => {
  const { error } = await createCommentSchema.validate(req.body);

  if (error) {
    return res
      .status(404)
      .json(
        new ErrorRes(404, error.message.replace(/\\n/g, " ").replace(/\"/g, ""))
      );
  }
  const comment = await commentsService.addComment(
    req.params.id,
    req.user.email,
    req.body.content
  );

  if (!comment)
    return res.status(400).json(new ErrorRes(400, "post not found"));

  return res
    .status(201)
    .json(new SuccessRes(201, "Comment created successfully"));
};

export const deleteComment = async (req: Request, res: Response) => {
  const deleteComment = await commentsService.deleteComment(req.params.id);
  if (!deleteComment)
    return res.status(404).json(new ErrorRes(404, "Cannot delete comment"));
  res.status(204).send();
};

export const updateComment = async (req: Request, res: Response) => {
  const { error } = await createCommentSchema.validate(req.body);
  if (error) {
    return res
      .status(404)
      .json(
        new ErrorRes(404, error.message.replace(/\\n/g, " ").replace(/\"/g, ""))
      );
  }
  const updateComment = await commentsService.updateComment(
    req.params.id,
    req.body.content
  );
  if (!updateComment)
    return res.status(404).json(new ErrorRes(404, "Cannot update comment"));
  return res
    .status(201)
    .json(new SuccessRes(201, "Comment udpated successfully"));
};
