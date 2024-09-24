import { Request, Response, NextFunction } from "express";
import { getTokenFromReq } from "../utils/jwt";
import { ErrorRes } from "../utils/validation";
import jwt from "jsonwebtoken";

export const AuthGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenFromReq(req);
  if (!token)
    return res.status(401).json(new ErrorRes(401, "User not Authorized"));

  try {
    const user = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    req.user = user;

    return next();
  } catch {
    return res.status(401).json(new ErrorRes(401, "Invalid token"));
  }
};

export default AuthGuard;
