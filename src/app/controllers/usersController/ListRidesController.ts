import { Request, Response } from "express";
import { UserRepository } from "../../repository/user/UserRespository";
import { ListRidesUseCase } from "../../UseCases/users/ListRidesUseCase";

const ridesUsecase = new ListRidesUseCase(new UserRepository());

type bearer_token = {
  authorization: string;
};

class RidesController {
  async list(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers as bearer_token; //pega o token no header da aplicação pela propriedade authorization no formato 'Bearer <token>'

    const events = await ridesUsecase.list(authorization);
    res.status(200).json(events);
  }
}

export default new RidesController();
