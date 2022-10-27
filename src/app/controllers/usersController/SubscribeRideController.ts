import { Request, Response } from "express";
import { RideRepository } from "../../repository/ride/RideRepository";
import { SubscribeRideUseCase } from "../../UseCases/rides/SubscribeRideUseCase";

const subscribeRideUse = new SubscribeRideUseCase(new RideRepository());

class SubscribeRideController {
  async subscribe(req: Request, response: Response): Promise<void> {
    const subscribeData = req.body;
    try {
      const subs = await subscribeRideUse.subscribe(subscribeData); //envia para UseCase os dados da inscrição
      response.status(201).json(subs);
    } catch (error) {
      response.status(500).json({ error });
    }
  }
}

export default new SubscribeRideController();
