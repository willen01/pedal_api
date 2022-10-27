import { Ride } from "../../entities/Ride";
import { EventsRepository } from "../../repository/user/EventsRepository";

export class ListAllRidesUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async listAll(): Promise<Ride[]> {
    return await this.eventsRepository.listAllRides();
  }
}
