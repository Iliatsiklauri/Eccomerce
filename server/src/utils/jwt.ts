import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5h" });
};
export const getTokenFromReq = (req) => {
  const token = req.headers["authorization"];

  if (!token) return null;

  return token;
};
