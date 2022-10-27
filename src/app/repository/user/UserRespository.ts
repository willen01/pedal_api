import { PrismaClient } from "@prisma/client";
import { User } from "../../entities/User";
import bcrypt from "bcryptjs";
import { IEvents, IUser } from "../../protocols/User";
import { Ride } from "../../entities/Ride";

const prismaClient = new PrismaClient();

export class UserRepository implements IUser, IEvents {
  async findOne(login: string): Promise<User | null> {
    return await prismaClient.users.findUnique({ where: { login } });
  }

  async save(user: User): Promise<void> {
    await prismaClient.users.create({
      data: { ...user, password: bcrypt.hashSync(user.password, 10) },
    });
  }

  async listRides(id: string): Promise<Ride[]> {
    return await prismaClient.rides.findMany({ where: { user_id: id } });
  }

  async listAllRides(): Promise<Ride[]> {
    return await prismaClient.rides.findMany();
  }

  async listParticipations(id: string): Promise<Ride[]> {
    const foo = await prismaClient.userEvents.findMany({
      where: {
        user_id: id,
      },
      include: {
        events: true,
      },
    });
    const participations = foo.map((p) => p.events);
    return participations;
  }
}
