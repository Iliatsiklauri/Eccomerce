import { AppDataSource } from "../db/database-connect";
import { User } from "../db/entity/User";
import { UserService } from "./user.service";
import { generateToken } from "../utils/jwt";

import bcrypt from "bcrypt";

const UsersService = new UserService();

export class AuthService {
  private readonly userRepository = AppDataSource.getRepository(User);

  async singIn(
    signInDto: Pick<User, "email" | "password">
  ): Promise<null | number | string> {
    const { email, password } = signInDto;
    if (!password) return 400;

    const user: User = await UsersService.getUserByEmail(email);
    if (!user) return 404;

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) return 401;

    return await generateToken({
      email,
      role: user.role,
      fullname: user.fullname,
      initialAdmin: user.initialAdmin,
    });
  }
}