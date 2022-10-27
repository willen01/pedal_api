import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../../protocols/User";

export class LoginUserUseCase {
  constructor(private userRepository: IUser) {}

  async login(login: string, password: string): Promise<string> {
    const findUser = await this.userRepository.findOne(login);
    if (findUser == null) throw "Login Incorrect";

    const comparePassword: boolean = bcrypt.compareSync(
      password,
      findUser.password
    );

    if (!comparePassword) throw new Error("Password Incorrect");

    const token = jwt.sign({ id: findUser.id }, process.env.JWT_TOKEN);
    return token;
  }
}
