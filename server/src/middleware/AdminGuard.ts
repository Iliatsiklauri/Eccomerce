import { Request, Response, NextFunction } from "express";
import { getTokenFromReq } from "../utils/jwt";
import { ErrorRes } from "../utils/validation";
import jwt from "jsonwebtoken";

export const AdminGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenFromReq(req);
  if (!token)
    return res.status(400).json(new ErrorRes(400, "Token not provided"));

  try {
    const admin = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    if (admin.role !== "ADMIN")
      return res.status(401).json(new ErrorRes(401, "Access denied"));

    req.user = admin;

    return next();
  } catch {
    return res.status(400).json(new ErrorRes(400, "Invalid token"));
  }
};

export default AdminGuard;
