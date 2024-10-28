import { AppDataSource } from "../db/database-connect";
import { Address } from "../db/entities/Address";
import { User } from "../db/entities/User";
import { generateToken } from "../utils/jwt";
import { userType } from "../utils/validation";
import bcrypt from "bcrypt";

export class UserService {
  private readonly userRepository = AppDataSource.getRepository(User);
  private readonly addressRepo = AppDataSource.getRepository(Address);

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        Address: true,
      },
    });
  }

  async getUserById(id): Promise<User | null> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        relations: { Address: true },
      });
    } catch {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: ["email", "password", "role", "fullname", "initialAdmin", "id"],
      });
      return user ?? null;
    } catch {
      return null;
    }
  }

  async createUser(createUserDto): Promise<null | string> {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const newUser = (await this.userRepository.create(createUserDto)) as any;
      const savedUser: User = await this.userRepository.save(newUser);
      const token = generateToken({
        id: savedUser.id,
        email: savedUser.email,
        role: savedUser.role,
        fullname: savedUser.fullname,
        initialAdmin: savedUser.initialAdmin,
      });
      return token;
    } catch (er) {
      return null;
    }
  }

  async updateUser(
    id: number,
    email: string,
    role: string,
    updateUserDto: Partial<userType>
  ): Promise<null | User | number> {
    try {
      const existingUser = await this.userRepository.findOneBy({ id });

      if (!existingUser) return null;

      if (role !== "ADMIN" && existingUser.id !== id) {
        return 401;
      }

      if (updateUserDto.password)
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

      Object.assign(existingUser, updateUserDto);
      return await this.userRepository.save(existingUser);
    } catch (error) {
      return null;
    }
  }

  async deleteUser(
    id,
    email: string,
    role: string
  ): Promise<null | boolean | number> {
    try {
      const targetUser = await this.userRepository.findOne({
        where: { id },
        relations: { Address: true },
      });
      if (role !== "ADMIN" && targetUser.id !== id) {
        return 401;
      }
      if (targetUser?.Address) {
        await this.addressRepo.delete(targetUser.Address.id);
      }
      const deletedUser = await this.userRepository.delete({ id });
      if (deletedUser.affected === 0) return 404;

      return true;
    } catch {
      return null;
    }
  }
}
