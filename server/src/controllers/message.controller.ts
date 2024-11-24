import { Request, Response } from "express";
import { MessageService } from "../services/message.service";
import { ErrorRes } from "../utils/validation";

const messageService = new MessageService();

export const getAllMessage = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (!userId || isNaN(Number(userId)))
    return res.status(400).json(new ErrorRes(400, "Invalid user Id"));
  const messages = await messageService.getAllMessage(userId);
  return res.json(messages);
};

export const getAllUsersFromMessages = async (req: Request, res: Response) => {
  const users = await messageService.getAllUsersFromMessages();
  res.json(users);
};
