import { Request, Response } from "express";
// import { EventsRepository } from "src/app/repository/user/EventsRepository";
import { EventsRepository } from "../../repository/user/EventsRepository";
// import { ListParticipationsUseCase } from "src/app/UseCases/users/ListParticiparionsUseCase";
import { ListParticipationsUseCase } from "../../UseCases/users/ListParticiparionsUseCase";

const listParticipationsUseCase = new ListParticipationsUseCase(
  new EventsRepository()
);

type bearer_token = {
  authorization: string;
};

class ParticipationsController {
  async list(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers as bearer_token; //pega o token no header da aplicação pela propriedade authorization no formato 'Bearer <token>';
    const events = await listParticipationsUseCase.list(authorization);

    res.status(200).json(events);
  }
}

export default new ParticipationsController();
