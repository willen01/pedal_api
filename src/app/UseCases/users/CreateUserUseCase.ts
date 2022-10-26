import { User } from "../../entities/User";
import { UserRepository } from "../../repository/user/UserRespository";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async create(user: User): Promise<void> {
    const verifyUserExists = await this.userRepository.findOne(user.login);

    if (verifyUserExists != null) throw "User already exists";

    await this.userRepository.save(user);
  }
}
