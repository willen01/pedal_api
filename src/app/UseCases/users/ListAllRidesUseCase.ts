import { IEvents } from "../../protocols/User";
import { Ride } from "../../entities/Ride";

export class ListAllRidesUseCase {
  constructor(private eventsRepository: IEvents) {}

  async listAll(): Promise<Ride[]> {
    return await this.eventsRepository.listAllRides();
  }
}
