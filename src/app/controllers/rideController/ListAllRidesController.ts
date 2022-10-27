import { Request, Response } from "express";
import { UserRepository } from "../../repository/user/UserRespository";
import { ListAllRidesUseCase } from "../../UseCases/users/ListAllRidesUseCase";

const listAllridesUseCase = new ListAllRidesUseCase(new UserRepository());

class ListAllRidesController {
  async listAll(_: Request, res: Response): Promise<void> {
    const rides = await listAllridesUseCase.listAll();
    try {
      res.status(200).json(rides);
    } catch (error) {
      res.status(400).json({});
    }
  }
}

export default new ListAllRidesController();
