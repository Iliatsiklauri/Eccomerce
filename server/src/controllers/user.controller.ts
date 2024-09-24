import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { SuccessRes, ErrorRes, userSchema } from "../utils/validation";

const UsersService = new UserService();

export const getAllUsers = async (req: Request, res: Response) => {
  if (req.user.role !== "ADMIN")
    return res.status(401).json(new ErrorRes(401, "Access denied"));
  const users = await UsersService.getAllUsers();
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await UsersService.getUserById(req.params.id);
  if (!user) return res.status(404).json(new ErrorRes(404, "User not Found"));
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json(
      new ErrorRes(
        400,
        error.details.map((detail) =>
          detail.message.replace(/\\n/g, " ").replace(/\"/g, "")
        )
      )
    );
  }
  const existingUser = await UsersService.getUserByEmail(req.body.email);
  if (existingUser) {
    return res
      .status(400)
      .json(new ErrorRes(400, "This Email is already in use"));
  }
  const token = await UsersService.createUser(req.body);

  res.status(201).json(new SuccessRes(201, "User created Successfully", token));
};

export const updateUserInfo = async (req: Request, res: Response) => {
  const { email, fullname, password } = req.body;
  const updateData = { email, fullname, password };

  const user = await UsersService.updateUser(
    Number(req.params.id),
    req.user.email,
    req.user.role,
    updateData
  );

  if (!user) return res.status(404).json(new ErrorRes(404, "User not Found"));
  if (user === 401)
    return res
      .status(user)
      .json(new ErrorRes(user, "User Unauthorized to update others account"));

  res.status(200).json(new SuccessRes(200, "User updated successfully"));
};

export const deleteUser = async (req: Request, res: Response) => {
  const deletedUser = await UsersService.deleteUser(
    req.params.id,
    req.user.email,
    req.user.role
  );
  if (deletedUser === 401)
    return res
      .status(401)
      .json(new ErrorRes(401, "User Unauthorized to delete others accaunt"));
  if (deletedUser === 404)
    return res.status(404).json(new ErrorRes(404, "User not Found"));
  res.status(204).send();
};
