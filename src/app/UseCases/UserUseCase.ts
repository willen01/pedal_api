import { User } from "../entities/User";
import UserRespository from "../repository/UserRespository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DecodeToken } from "../protocols/DecodeToken";
import { Rides } from "@prisma/client";

class UserUseCase {
  async create(user: User): Promise<void> {
    const verifyUser = await UserRespository.findUser(user.login); //verifica se já existe um usuário cadastrado com o login recebido

    if (verifyUser != null) throw "user already exists";

    UserRespository.create(user); //envia os dados do usuário para cadastro pelo repository
  }

  async login(login: string, password: string): Promise<string> {
    const findUser = await UserRespository.findUser(login); //verifica se existe um usuário cadastrado com o login recebido
    if (findUser == null) throw "login or password incorrect";

    const comparePassword: boolean = bcrypt.compareSync(
      password,
      findUser.password
    ); //verifica se a senha passada pelo usário é compatível com a senha criptografada no banco

    if (!comparePassword) throw "login or password incorrect";

    const token = jwt.sign({ id: findUser.id }, process.env.JWT_TOKEN); //gera um token com o id do usuário

    return token;
  }

  async rides(bearer_token: string) {
    const token = new DecodeToken(bearer_token);
    const userId = token.getId(); //pega o id do usuário pelo token inserido

    return await UserRespository.findRides(userId); //envia o id do Usuário para busca dos eventos cadastrados por ele
  }

  async participations(bearer_token: string): Promise<Rides[]> {
    const token = new DecodeToken(bearer_token);
    const userId = token.getId(); //pega o id do usuário pelo token inserido

    const participations = await UserRespository.findParticipations(userId);

    const result = participations.map((e) => e.events); //pega somente a propriedade 'events' e ignora as demais propriedades de participations
    return result;
  }
}

export default new UserUseCase();
