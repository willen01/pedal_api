import { Request, Response } from "express";
import { UserRepository } from "../../../app/repository/user/UserRespository";
import { CreateUserUseCase } from "../../../app/UseCases/users/CreateUserUseCase";

const createUseCase = new CreateUserUseCase(new UserRepository());

class CreateUserController {
  async create(req: Request, res: Response): Promise<void> {
    const userData = req.body;

    try {
      const user = await createUseCase.create(userData);
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new CreateUserController();
