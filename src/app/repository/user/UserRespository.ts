import { PrismaClient } from "@prisma/client";
import { User } from "../../entities/User";
import bcrypt from "bcryptjs";
import { IUser } from "../../protocols/User";

const prismclient = new PrismaClient();

export class UserRepository implements IUser {
  async findOne(login: string): Promise<User | null> {
    return await prismclient.users.findUnique({ where: { login } });
  }

  async save(user: User): Promise<void> {
    await prismclient.users.create({
      data: { ...user, password: bcrypt.hashSync(user.password, 10) },
    });
  }
}
