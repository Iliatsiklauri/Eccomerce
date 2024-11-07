import { jwtpayload } from "jsonwebtoken";
import { userType } from "./src/utils/validation";

declare global {
  namespace Express {
    interface Request {
      user?: Pick<userType, "email" | "role" | "id">;
      file?: multer.File;
    }
  }
}
