import { Request, Response } from "express";
import RideUseCase from "../UseCases/RideUseCase";

type bearer_token = {
  authorization: string;
};

class RideController {
  async create(request: Request, response: Response): Promise<void> {
    const dataRide = request.body;
    const { authorization } = request.headers as bearer_token; //pega o token no header da aplicação pela propriedade authorization no formato 'Bearer <token>'

    try {
      const ride = await RideUseCase.create(dataRide, authorization); //envia os dados do evento junto com o token
      response.status(201).json(ride);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  async list(_: Request, response: Response): Promise<void> {
    try {
      const rides = await RideUseCase.read();
      response.status(200).json(rides);
    } catch (error) {
      response.status(500).json(error);
    }
  } // lista todos eventos cadastrados

  async subscribe(request: Request, response: Response): Promise<void> {
    const subscribeData = request.body;

    try {
      const subs = await RideUseCase.subscribe(subscribeData); //envia para UseCase os dados da inscrição
      response.status(201).json(subs);
    } catch (error) {
      response.status(500).json({ error });
    }
  }
}

export default new RideController();
