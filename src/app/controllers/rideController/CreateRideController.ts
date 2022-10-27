import { Request, Response } from "express";
import { RideRepository } from "../../repository/ride/RideRepository";
import { CreateRideUsecase } from "../../UseCases/rides/CreateRideUsecase";

type bearer_token = {
  authorization: string;
};

const createRideUseCase = new CreateRideUsecase(new RideRepository());

class CreateRideController {
  create(req: Request, res: Response): void {
    const dataRide = req.body;
    const { authorization } = req.headers as bearer_token; //pega o token no header da aplicação pela propriedade authorization no formato 'Bearer <token>'

    try {
      const ride = createRideUseCase.create(dataRide, authorization); //envia os dados do evento junto com o token
      res.status(201).json(ride);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new CreateRideController();
