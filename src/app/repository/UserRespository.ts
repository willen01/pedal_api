import { PrismaClient, Users } from "@prisma/client";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

const prismclient = new PrismaClient();

class UserRepository {
  async create(user: User): Promise<Users> {
    return await prismclient.users.create({
      data: { ...user, password: bcrypt.hashSync(user.password, 10) },
    }); //salva todos os dados de usuário recebido e sobrescreve o campo password com criptografia
  }

  async findUser(userLogin: string): Promise<Users | null> {
    return await prismclient.users.findUnique({ where: { login: userLogin } });
  }

  async findRides(id: string) {
    return await prismclient.rides.findMany({
      where: {
        user_id: id,
      },
    }); //busca os eventos cadastrados pelo usuário com base no seu id.
  }

  async findParticipations(id: string) {
    return await prismclient.userEvents.findMany({
      where: {
        user_id: id,
      },
      include: {
        events: true,
      },
    });
  } //retorna todos os eventos que o usuário se inscreveu com base no seu id
}

export default new UserRepository();
