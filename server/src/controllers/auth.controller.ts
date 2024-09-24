import { Request, Response } from "express";
import { ErrorRes, SuccessRes } from "../utils/validation";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const signIn = async (req: Request, res: Response) => {
  const response = await authService.singIn(req.body);
  if (response === 400)
    return res.status(400).json(new ErrorRes(400, "Password is required"));
  if (response === 404)
    return res.status(404).json(new ErrorRes(404, "User does not exist"));
  if (response === 401)
    return res.status(401).json(new ErrorRes(401, "Incorrect password"));

  res
    .status(200)
    .json(
      new SuccessRes(200, "User signed in successfully", response as string)
    );
};

export const addAdmin = async (req: Request, res: Response) => {
  res.send("add admin");
};

export const getAllAdmins = async (req: Request, res: Response) => {
  res.send("All admins");
};

export const deleteAdmin = async (req: Request, res: Response) => {
  res.send("delete admin");
};
