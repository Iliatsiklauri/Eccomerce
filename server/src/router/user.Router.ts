import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserInfo,
} from "../controllers/user.controller";
const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.put("/:id", updateUserInfo);
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
