import { IUser } from "../../protocols/User";
import { User } from "../../entities/User";

export class CreateUserUseCase {
  constructor(private userRepository: IUser) {}

  async create(user: User): Promise<void> {
    const verifyUserExists = await this.userRepository.findOne(user.login);

    if (verifyUserExists != null) throw "User already exists";

    await this.userRepository.save(user);
  }
}
